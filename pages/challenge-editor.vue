<template>
  <Page title="Challenge Editor" name="challenge-editor">
    <BaseSpinner v-if="loading" />
    <div v-else class="challenge-editor__page-content">
      <EditorIntroModal :active="showIntroModal" />
      <ConfirmModal
        :active="showConfirmModal"
        :text="confirmText"
        @confirm="confirmAction"
      />
      <section class="challenge-editor__top">
        <ChallengeNameField v-model.trim="name" />
        <ChallengeLanguageField v-model="language" />
        <ChallengeImageField v-model="image" />
        <LaunchDateField v-if="!templateOnlyMode" v-model="date" />
        <TemplateAvailabilityField v-if="isAdmin" v-model="isTemplatePublic" />
        <AllowCopiesField
          v-if="showAllowCopies"
          v-model="allowTemplateCopies"
        />
      </section>
      <SectionSeperator />
      <PreChallengeMessages v-if="showPreMessages" />
      <SectionSeperator v-if="showPreMessages" />
      <EditorMainArea />
      <EditorFloatingButtons />
      <EditorNotifications />
    </div>
  </Page>
</template>

<script>
import {
  clearedOptions,
  isSelectionMatching,
  randomEmoji
} from "../assets/util/functions";
import confirmModal from "../mixins/confirm-modal";

export default {
  mixins: [confirmModal],
  inject: ["addNotification"],
  meta: {
    requiresAuth: true
  },
  async asyncData(context) {
    return await context.$getEditorData();
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
    isAdmin() {
      return this.user?.accountType === "admin";
    },
    showAllowCopies() {
      return this.isAdmin && this.isTemplatePublic;
    },
    isTemplateEditable() {
      return this.isAdmin || this.allowTemplateCopies || !this.isTemplatePublic;
    },
    showPreMessages() {
      const hasContent = () => {
        for (let message of this.preMessages) {
          if (message.text.trim()) return true;
        }
        return false;
      };
      const isEmpty = !this.preMessages.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    draftData() {
      return {
        name: this.name,
        language: this.language,
        date: this.date,
        preMessages: this.preMessages,
        days: this.options,
        isTemplatePublic: this.isTemplatePublic,
        allowTemplateCopies: this.allowTemplateCopies,
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
        isPublic: this.isTemplatePublic,
        allowCopies: this.allowTemplateCopies
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
      if (!this.isTemplateEditable) return;
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
      try {
        if (!this.name) {
          throw "Challenge name can't be empty";
        }
        if (!this.language) {
          throw "Please choose a language for the template";
        }
        const selectedEmojis = [];
        for (let day of this.options) {
          if (!day.tasks.length) {
            throw "One or more days were left empty";
          }
          for (let task of day.tasks) {
            if (!task.options.length) {
              throw "One or more tasks were left empty";
            }
            while (!task.emoji || selectedEmojis.includes(task.emoji)) {
              task.emoji = randomEmoji();
            }
            selectedEmojis.push(task.emoji);
            if (!this.templateOnlyMode && !isSelectionMatching(task)) {
              throw "One or more tasks were left with no selection";
            }
          }
        }
        this.submit.error = null;
        return true;
      } catch (error) {
        this.submit.error = error;
        return false;
      }
    },
    async createNewChallenge() {
      await this.saveTemplate();
      await this.$axios.$post("/xapi", {
        createChallenge: {
          draftId: this.draftId,
          templateId: this.templateId,
          selections: this.finalSelections,
          date: this.date,
          name: this.name
        }
      });
      this.$cookies.remove("draftId");
      this.addNotification(
        `Successfully created new challenge from template: <strong>${this.name}</strong>.`
      );
      this.$router.replace("/dashboard");
    },
    async updateChallenge() {
      await this.saveTemplate();
      await this.$axios.$post("/xapi", {
        updateChallenge: {
          challengeId: this.editedChallengeId,
          draftId: this.draftId,
          templateId: this.templateId,
          selections: this.finalSelections,
          date: this.date,
          name: this.name
        }
      });
      this.$cookies.remove("draftId");
      this.addNotification(
        `Successfully updated challenge and template: <strong>${this.name}</strong>.`
      );
      this.$router.replace("/dashboard");
    },
    async saveTemplateAndRedirect() {
      await this.saveTemplate(true);
      this.$cookies.remove("draftId");
      this.addNotification(
        `Successfully saved template: <strong>${this.name}</strong>.`
      );
      this.$router.replace("/dashboard");
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
    image() {
      this.autoSaveData();
    },
    date() {
      this.autoSaveData();
    },
    isTemplatePublic() {
      this.autoSaveData();
    },
    allowTemplateCopies() {
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
    }
  },
  async mounted() {
    if (this.loading) {
      const data = await this.$getEditorData();
      for (let key in data) {
        this[key] = data[key];
      }
    } else if (!this.user?.drafts) {
      setTimeout(() => {
        this.showIntroModal = true;
      }, 1500);
    }
  },
  provide() {
    return {
      templateOnlyMode: this.templateOnlyMode,
      editedChallengeId: this.editedChallengeId,
      isTemplateEditable: this.isTemplateEditable,
      getLanguage: () => this.language,
      openIntroModal: () => {
        this.showIntroModal = true;
      },
      getPreMessages: () => this.preMessages,
      getOptions: () => this.options,
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
