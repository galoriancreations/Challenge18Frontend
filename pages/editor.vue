<template>
  <Page :title="title" name="challenge-editor">
    <EditorIntroModal :active="showIntroModal" />
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
    <EditorTopArea />
    <SectionSeperator />
    <PreChallengeMessages v-if="showPreMessages" />
    <SectionSeperator v-if="showPreMessages" />
    <EditorMainArea />
    <EditorFloatingButtons />
    <EditorNotifications />
  </Page>
</template>

<script>
import {
  transformData,
  initialPreMessages,
  initialOptions,
  defaultDate,
  clearedOptions,
  isSelectionMatching,
  randomEmoji
} from "~/assets/util/functions";
import confirmModal from "~/mixins/confirm-modal";

export default {
  mixins: [confirmModal],
  inject: ["addNotification"],
  meta: {
    requiresAuth: true
  },
  async asyncData({ app, store, $axios, error }) {
    try {
      const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();
      const { user } = store.getters;
      const isAdmin = user?.accountType === "admin";
      const endpoint = !draftId && challengeId ? "/api" : "/xapi";
      const key = draftId
        ? "getDraftData"
        : challengeId
        ? "getChallengeData"
        : selectedTemplate && "getTemplateData";
      const value = draftId || challengeId || selectedTemplate;
      const data = key
        ? transformData(await $axios.$post(endpoint, { [key]: value }))
        : {};
      return {
        data: {
          name: data.name || "",
          language: data.language || user?.language,
          image: data.image || null,
          date: new Date(data.date || defaultDate()),
          preMessages: initialPreMessages(data.preMessages),
          options: initialOptions(data.days),
          isTemplatePublic: key ? data.isTemplatePublic : isAdmin,
          allowTemplateCopies: key ? data.allowTemplateCopies : !isAdmin
        },
        draftId: draftId || null,
        templateId: data.templateId || selectedTemplate || null
      };
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
    title() {
      return this.templateOnlyMode ? "Template Editor" : "Challenge Editor";
    },
    user() {
      return this.$store.getters.user;
    },
    isAdmin() {
      return this.user?.accountType === "admin";
    },
    isTemplateEditable() {
      const { allowTemplateCopies, isTemplatePublic } = this.data;
      return this.isAdmin || allowTemplateCopies || !isTemplatePublic;
    },
    showPreMessages() {
      const hasContent = () => {
        for (let message of this.data.preMessages) {
          if (message.text.trim()) return true;
        }
        return false;
      };
      const isEmpty = !this.data.preMessages.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    draftData() {
      return {
        name: this.data.name,
        language: this.data.language,
        image: this.data.image,
        date: this.data.date,
        preMessages: this.data.preMessages,
        days: this.data.options,
        isTemplatePublic: this.data.isTemplatePublic,
        allowTemplateCopies: this.data.allowTemplateCopies,
        templateId: this.templateId,
        challengeId: this.editedChallengeId
      };
    },
    templateData() {
      return {
        id: this.templateId,
        name: this.data.name,
        language: this.data.language,
        image: this.data.image,
        preMessages: this.data.preMessages,
        days: clearedOptions(this.data.options),
        isPublic: this.data.isTemplatePublic,
        allowCopies: this.data.allowTemplateCopies
      };
    },
    selections() {
      const selections = {};
      this.data.options.forEach(day => {
        selections[day.id] = {};
        day.tasks.forEach(task => {
          selections[day.id][task.id] = task.selection;
        });
      });
      return selections;
    }
  },
  methods: {
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
          console.error(err);
          this.autoSave.error = true;
        }
        this.autoSave.loading = false;
      }, 5000);
    },
    async saveDraft() {
      if (this.templateOnlyMode) return;
      const { draftId } = await this.$axios.$post("/xapi", {
        saveDraft: {
          draftId: this.draftId,
          draftData: this.draftData
        }
      });
      this.draftId = draftId;
    },
    async saveTemplate() {
      if (!this.isTemplateEditable || !this.editedChallengeId) return;
      const { templateId } = await this.$axios.$post("/xapi", {
        saveTemplate: {
          templateId: this.templateId,
          templateData: this.templateData,
          draftId: this.draftId,
          finishEditing: false
        }
      });
      this.templateId = templateId;
    },
    async saveChallenge() {
      await this.saveTemplate();
      const mode = this.editedChallengeId
        ? "updateChallenge"
        : "createChallenge";
      const successText = this.editedChallengeId
        ? "Successfully updated challenge"
        : "Created new challenge from template";
      await this.$axios.$post("/xapi", {
        [mode]: {
          challengeId: this.editedChallengeId,
          draftId: this.draftId,
          templateId: this.templateId,
          selections: this.selections,
          date: this.data.date,
          name: this.data.name
        }
      });
      this.$cookies.remove("draftId");
      this.addNotification(
        `${successText}: <strong>${this.data.name}</strong>.`
      );
      this.$router.replace("/dashboard");
    },
    validateData() {
      try {
        if (!this.data.name) {
          throw "Challenge name can't be empty";
        }
        if (!this.data.language) {
          throw "Please choose a language for the template";
        }
        const selectedEmojis = [];
        this.data.options.forEach((day, dayIndex) => {
          const isDayEmpty =
            !day.introduction.trim() &&
            !day.tasks.length &&
            !day.messages.length;
          if (isDayEmpty) {
            throw `Day ${dayIndex + 1} was left empty`;
          }
          day.tasks.forEach((task, taskIndex) => {
            const taskLabel = `Task ${taskIndex + 1} on day ${dayIndex + 1}`;
            if (!task.options.length) {
              throw `${taskLabel} was left empty`;
            }
            if (!this.templateOnlyMode && !isSelectionMatching(task)) {
              throw `${taskLabel} was left with no selection`;
            }
            while (!task.emoji || selectedEmojis.includes(task.emoji)) {
              task.emoji = randomEmoji();
            }
            selectedEmojis.push(task.emoji);
          });
        });
        this.submit.error = null;
        return true;
      } catch (error) {
        this.submit.error = error;
        return false;
      }
    },
    async submitHandler() {
      if (this.templateOnlyMode) {
        return this.$router.replace("/dashboard");
      }
      if (!this.validateData()) return;
      clearTimeout(this.autoSave.timeout);
      this.submit.loading = true;
      try {
        await this.saveChallenge();
      } catch (error) {
        this.submit.error = error;
        this.submit.loading = false;
      }
    }
  },
  watch: {
    data: {
      handler() {
        this.autoSaveData();
      },
      deep: true
    },
    draftId(value) {
      this.$cookies.set("draftId", value);
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
      isTemplateEditable: this.isTemplateEditable,
      data: this.data,
      getLanguage: () => this.data.language,
      openIntroModal: () => {
        this.showIntroModal = true;
      },
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
