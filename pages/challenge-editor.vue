<template>
  <Page title="Challenge Editor" name="challenge-editor">
    <ErrorMessage v-if="errorLoading" :error="errorLoading" />
    <div v-else class="challenge-editor__container">
      <EditorIntroModal :active="showIntroModal" />
      <ConfirmModal
        :active="showConfirmModal"
        :text="confirmText"
        @confirm="confirmAction"
      />
      <section class="challenge-editor__top">
        <ChallengeNameField v-model.trim="name" />
        <ChallengeLanguageField v-model="language" />
        <TemplateAvailabilityField
          v-if="showVisibilitySelector"
          v-model="isTemplatePublic"
        />
      </section>
      <SectionSeperator />
      <EditorMainArea />
      <EditorFloatingButtons />
      <EditorNotifications />
    </div>
  </Page>
</template>

<script>
import { initialOptions, clearedOptions } from "../assets/util/functions";
import confirmModal from "../mixins/confirm-modal";

export default {
  mixins: [confirmModal],
  // meta: {
  //   requiresAuth: true,
  //   forOrganizations: true
  // },
  async asyncData({ app, store, $axios }) {
    try {
      const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();
      const { user } = store.getters;

      if (challengeId) {
        const { challenge, configId } = await $axios.$post("/xapi", {
          getChallengeConfig: challengeId
        });
        return {
          name: challenge.name,
          language: challenge.language,
          options: initialOptions(challenge.days),
          draftId: configId,
          errorLoading: null
        };
      } else if (draftId) {
        const { draft } = await $axios.$post("/xapi", {
          getDraftData: draftId
        });
        return {
          name: draft.name,
          language: draft.language,
          options: draft.days,
          draftId,
          isTemplatePublic: draft.isTemplatePublic,
          templateId: draft.templateId,
          errorLoading: null
        };
      } else if (selectedTemplate) {
        const { template } = await $axios.$post("/xapi", {
          getTemplateData: selectedTemplate
        });
        return {
          name: template.name,
          language: template.language,
          options: initialOptions(template.days),
          draftId: null,
          isTemplatePublic: template.isPublic && user?.accountType === "admin",
          templateId: template.id,
          errorLoading: null
        };
      } else {
        return {
          name: "",
          language: user?.language || "English",
          options: initialOptions(),
          draftId: null,
          isTemplatePublic: user?.accountType === "admin",
          templateId: null,
          errorLoading: null
        };
      }
    } catch (error) {
      return {
        errorLoading: error
      };
    }
  },
  data() {
    return {
      autoSave: {
        timeout: null,
        date: null,
        loading: false,
        error: false
      },
      submit: {
        loading: false,
        error: null
      },
      showIntroModal: false,
      transition: "task"
    };
  },
  computed: {
    editedChallengeId() {
      return this.$cookies.get("challengeId");
    },
    templateOnlyMode() {
      const { templateOnly } = this.$route.query;
      return templateOnly === "true" && !this.editedChallengeId;
    },
    user() {
      return this.$store.getters.user;
    },
    showVisibilitySelector() {
      return this.user?.accountType === "admin" && !this.editedChallengeId;
    },
    isModalOpen() {
      return this.showIntroModal || this.showConfirmModal;
    },
    draftData() {
      return {
        name: this.name,
        language: this.language,
        days: this.options,
        isTemplatePublic: this.isTemplatePublic,
        templateId: this.templateId,
        challengeId: this.editedChallengeId,
        templateOnly: this.templateOnlyMode
      };
    },
    finalTemplateData() {
      return {
        name: this.name,
        language: this.language,
        days: clearedOptions(this.options),
        isPublic: this.isTemplatePublic
      };
    },
    finalChallengeConfig() {
      return {
        name: this.name,
        language: this.language,
        days: clearedOptions(this.options, false)
      };
    }
  },
  methods: {
    onCloseModal() {
      this.showIntroModal = false;
    },
    async saveDraft() {
      const { draftId } = await this.$axios.$post("/xapi", {
        saveDraft: {
          draftId: this.draftId,
          draftData: this.draftData
        }
      });
      this.draftId = draftId;
    },
    async saveTemplate(finishEditing = false) {
      const { templateId } = await this.$axios.$post("/xapi", {
        saveTemplate: {
          templateId: this.templateId,
          templateData: this.finalTemplateData,
          draftId: this.draftId,
          finishEditing
        }
      });
      this.templateId = templateId;
    },
    autoSaveData() {
      clearTimeout(this.autoSave.timeout);
      this.autoSave.timeout = setTimeout(async () => {
        this.autoSave.saving = true;
        try {
          if (!this.editedChallengeId) {
            await this.saveTemplate();
          }
          await this.saveDraft();
          this.autoSave.date = new Date();
          this.autoSave.error = false;
        } catch {
          this.autoSave.error = true;
        }
        this.autoSave.saving = false;
      }, 5000);
    },
    isSelectionMatching(dayIndex, taskIndex) {
      const task = this.options[dayIndex].tasks[taskIndex];
      for (let option of task.options) {
        if (option.text === task.selection) {
          return true;
        }
      }
      return false;
    },
    validateData() {
      if (!this.name) {
        this.submit.error = "Challenge name can't be empty";
        return false;
      }
      if (!this.language) {
        this.submit.error = "Please choose a language for the template";
        return false;
      }
      for (let day of this.options) {
        if (!day.title) {
          this.submit.error = "One or more days were left without a title";
          return false;
        }
        if (!day.tasks.length) {
          this.submit.error = "One or more days were left empty";
          return false;
        }
        const dayIndex = this.options.indexOf(day);
        for (let task of day.tasks) {
          if (!task.options.length) {
            this.submit.error = "One or more tasks were left empty";
            return false;
          }
          if (!this.templateOnlyMode) {
            const taskIndex = day.tasks.indexOf(task);
            if (!this.isSelectionMatching(dayIndex, taskIndex)) {
              this.submit.error = "One or more tasks were left empty";
              return false;
            }
          }
        }
      }
      this.submit.error = null;
      return true;
    },
    async createNewChallenge() {
      const { challenge } = await this.$axios.$post("/xapi", {
        createChallenge: {
          draftId: this.draftId,
          challengeData: this.finalChallengeConfig,
          templateId: this.templateId
        }
      });
      this.$router.replace(`/challenges/${challenge.id}`);
    },
    async updateChallenge() {
      await this.$axios.$post("/xapi", {
        updateChallenge: {
          challengeId: this.editedChallengeId,
          draftId: this.draftId,
          challengeData: this.finalChallengeConfig
        }
      });
      this.$router.push(`/challenges/${this.editedChallengeId}`);
    },
    async saveTemplateAndRedirect() {
      await this.saveTemplate(true);
      this.$router.push({
        path: "/dashboard",
        hash: this.isTemplatePublic ? "#public-templates" : "#my-templates"
      });
    },
    async submitHandler() {
      if (!this.validateData()) return;
      clearTimeout(this.autoSave.timeout);
      this.submit.loading = true;
      try {
        if (this.templateOnlyMode) {
          await this.saveTemplateAndRedirect();
        } else if (this.editedChallengeId) {
          await this.updateChallenge();
        } else {
          await this.createNewChallenge();
        }
      } catch (error) {
        this.submit.error = error;
        this.submit.loading = false;
      }
    }
  },
  watch: {
    name() {
      this.autoSaveData();
    },
    language() {
      this.autoSaveData();
    },
    options: {
      handler() {
        this.autoSaveData();
      },
      deep: true
    },
    draftId(value) {
      this.$cookies.set("draftId", value);
    },
    isModalOpen(value) {
      if (value) {
        this.transition = null;
      }
    }
  },
  mounted() {
    if (!this.errorLoading && !this.user?.drafts) {
      setTimeout(() => {
        this.showIntroModal = true;
      }, 1500);
    }
  },
  provide() {
    return {
      options: this.options,
      getLanguage: () => this.language,
      openIntroModal: () => {
        this.showIntroModal = true;
      },
      templateOnlyMode: this.templateOnlyMode,
      editedChallengeId: this.editedChallengeId,
      autoSave: this.autoSave,
      submit: this.submit,
      getTransition: () => this.transition,
      setTransition: value => {
        this.transition = value;
      },
      submitHandler: this.submitHandler
    };
  }
};
</script>
