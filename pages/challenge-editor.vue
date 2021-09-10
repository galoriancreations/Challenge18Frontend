<template>
  <Page title="Challenge Editor" name="challenge-editor">
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
    <PreChallengeMessages />
    <SectionSeperator />
    <EditorMainArea />
    <EditorFloatingButtons />
    <EditorNotifications />
  </Page>
</template>

<script>
import {
  initialPreMessages,
  initialOptions,
  clearedOptions,
  isSelectionMatching
} from "../assets/util/functions";
import confirmModal from "../mixins/confirm-modal";

export default {
  mixins: [confirmModal],
  meta: {
    requiresAuth: true
  },
  async asyncData({ app, store, $axios, error }) {
    try {
      const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();
      const { user } = store.getters;

      if (draftId) {
        const draft = await $axios.$post("/xapi", {
          getDraftData: draftId
        });
        return {
          name: draft.name,
          language: draft.language,
          preMessages: initialPreMessages(draft.preMessages),
          options: draft.days,
          draftId,
          isTemplatePublic: draft.isTemplatePublic,
          templateId: draft.templateId
        };
      } else if (challengeId) {
        const challenge = await $axios.$post("/api", {
          getChallengeData: challengeId
        });
        return {
          name: challenge.name,
          language: challenge.language,
          preMessages: initialPreMessages(challenge.preMessages),
          options: initialOptions(challenge.days),
          draftId: null,
          isTemplatePublic:
            challenge.isTemplatePublic && user.accountType === "admin",
          templateId: challenge.template
        };
      } else if (selectedTemplate) {
        const template = await $axios.$post("/xapi", {
          getTemplateData: selectedTemplate
        });
        return {
          name: template.name,
          language: template.language,
          preMessages: initialPreMessages(template.preMessages),
          options: initialOptions(template.days),
          draftId: null,
          isTemplatePublic: template.isPublic && user?.accountType === "admin",
          templateId: template.id
        };
      } else {
        return {
          name: "",
          language: user?.language || "English",
          preMessages: initialPreMessages(),
          options: initialOptions(),
          draftId: null,
          isTemplatePublic: user?.accountType === "admin",
          templateId: null
        };
      }
    } catch (err) {
      error(err);
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
        preMessages: this.preMessages,
        days: this.options,
        isTemplatePublic: this.isTemplatePublic,
        templateId: this.templateId,
        challengeId: this.editedChallengeId,
        templateOnly: this.templateOnlyMode
      };
    },
    finalTemplateData() {
      return {
        id: this.templateId,
        name: this.name,
        language: this.language,
        preMessages: this.preMessages,
        days: clearedOptions(this.options),
        isPublic: this.isTemplatePublic
      };
    },
    finalSelections() {
      const selections = {};
      this.options.forEach(day => {
        selections[day.id] = {};
        day.tasks.forEach(task => {
          selections[day.id][task.id] = task.selection;
        });
      });
      return selections;
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
      if (this.submit.error) {
        this.validateData();
      }
      clearTimeout(this.autoSave.timeout);
      this.autoSave.timeout = setTimeout(async () => {
        this.autoSave.loading = true;
        try {
          await this.saveTemplate();
          await this.saveDraft();
          this.autoSave.date = new Date();
          this.autoSave.error = false;
        } catch (err) {
          this.autoSave.error = true;
        }
        this.autoSave.loading = false;
      }, 5000);
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
        if (!day.tasks.length) {
          this.submit.error = "One or more days were left empty";
          return false;
        }
        for (let task of day.tasks) {
          if (!task.options.length) {
            this.submit.error = "One or more tasks were left empty";
            return false;
          }
          if (!this.templateOnlyMode && !isSelectionMatching(task)) {
            this.submit.error = "One or more tasks were left with no selection";
            return false;
          }
        }
      }
      this.submit.error = null;
      return true;
    },
    async createNewChallenge() {
      await this.saveTemplate();
      const challenge = await this.$axios.$post("/xapi", {
        createChallenge: {
          draftId: this.draftId,
          templateId: this.templateId,
          selections: this.finalSelections
        }
      });
      this.$cookies.remove("draftId");
      // this.$router.replace(`/challenges/${challenge.id}`);
      this.$router.replace("/dashboard");
    },
    async updateChallenge() {
      await this.$axios.$post("/xapi", {
        updateChallenge: {
          challengeId: this.editedChallengeId,
          draftId: this.draftId,
          templateId: this.templateId,
          selections: this.finalSelections
        }
      });
      this.$cookies.remove("draftId");
      // this.$router.push(`/challenges/${this.editedChallengeId}`);
      this.$router.replace("/dashboard");
    },
    async saveTemplateAndRedirect() {
      await this.saveTemplate(true);
      this.$cookies.remove("draftId");
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
    isPublic() {
      this.autoSaveData();
    },
    preMessages: {
      handler() {
        this.autoSaveData();
      },
      deep: true
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
    if (!this.user?.drafts) {
      setTimeout(() => {
        this.showIntroModal = true;
      }, 1500);
    }
  },
  provide() {
    return {
      templateOnlyMode: this.templateOnlyMode,
      editedChallengeId: this.editedChallengeId,
      getLanguage: () => this.language,
      openIntroModal: () => {
        this.showIntroModal = true;
      },
      preMessages: this.preMessages,
      options: this.options,
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
