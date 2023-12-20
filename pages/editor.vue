<template>
  <Page :title="title" name="editor">
    <EditorIntroModal :active="showIntroModal" />
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
    <EditorTopArea />
    <EditorContent />
    <EditorFloatingButtons />
    <EditorNotifications />
  </Page>
</template>

<script>
import {
  transformData,
  initialPreDays,
  initialDays,
  defaultDate,
  clearedDays,
  isSelectionMatching,
  isEmojiValid,
  randomEmoji
} from "~/assets/util/functions";
import confirmModal from "~/mixins/confirm-modal";
import moment from "moment";

export default {
  mixins: [confirmModal],
  inject: ["addNotification"],
  meta: {
    requiresAuth: true
  },
  async asyncData({ app, store, $axios, error }) {
    try {
      const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();

      const { user, isAdmin } = store.getters;
      const endpoint = !draftId && challengeId ? "/api" : "/xapi";
      const key = draftId
        ? "getDraftData"
        : challengeId
        ? "getChallengeData"
        : selectedTemplate && "getTemplateData";

      const value = draftId || challengeId || selectedTemplate;
      console.log(`edit test, draftId xapi key: ${key} : ${value}`);
      const data = key
        ? transformData(await $axios.$post(endpoint, { [key]: value }))
        : {};
      return {
        data: {
          name: data.name || "",
          language: data.language || user?.language,
          image: data.image || null,
          date: new Date(data.date || defaultDate()),
          dayMargin: data.dayMargin || 1,
          preDays: initialPreDays(data.preDays),
          days: initialDays(data.days),
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
      showIntroModal: false,
      uploading: [],
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
      base64: ""
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
    isTemplateEditable() {
      const { isAdmin } = this.$store.getters;
      const { allowTemplateCopies, isTemplatePublic } = this.data;
      return isAdmin || allowTemplateCopies || !isTemplatePublic;
    },
    draftData() {
      return {
        ...this.data,
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
        dayMargin: this.data.dayMargin,
        preDays: clearedDays(this.data.preDays),
        days: clearedDays(this.data.days),
        isPublic: this.data.isTemplatePublic,
        allowCopies: this.data.allowTemplateCopies
      };
    },
    selections() {
      const selections = {};
      
      let selectedDay = 1;
      let dayIndex = selectedDay - 1;
      let dateid;
      const date = ()=>{
        const date = moment(this.data.date);
        date.add(dayIndex * this.data.dayMargin, "days");
        dateid = date.format("L");
      }
      this.data.days.forEach((day,ind) => {
        selectedDay = ind
        dayIndex = selectedDay;
        
        date()
        selections[dateid] = {};
        day.tasks.forEach(task => {
          const time = task.time.slice(0,5)
          selections[dateid][task.id] = {message:task.selection,points:task.points,emoji:task.emoji,time:time};
        });
      });
      return selections;
    },
    challengeData() {
      return {
        challengeId: this.editedChallengeId,
        draftId: this.draftId,
        templateId: this.templateId,
        selections: this.selections,
        date: moment(this.data.date).format("L"),
        name: this.data.name,
        image: this.data.image,
      };
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
          //if drafts are working do we need it here?:
          await this.saveTemplate();
          await this.saveDraft();
          this.autoSave.date = new Date();
          this.autoSave.error = false;
        } catch {
          this.autoSave.error = true;
        }
        this.autoSave.loading = false;
      }, 5000); 
    },

    async saveDraft() {
      console.log();
      // i changed it to false:
      if (!this.templateOnlyMode) return;

      console.log(`picture: ${this.data.image}`);
      const { draftId } = await this.$axios.$post("/xapi", {
        saveDraft: {
          draftId: this.draftId,
          draftData: this.draftData
        }
      });
      this.draftId = draftId;
    },
    async saveTemplate() {
      console.log(`saveTemplate start`);
      console.log(`templateId: ${this.templateId}`);
      console.log(`templateData:`, this.templateData);
      if (!this.isTemplateEditable) return;
      const { templateId } = await this.$axios.$post("/xapi", {
        saveTemplate: {
          templateId: this.templateId,
          templateData: this.templateData
        }
      });
      this.templateId = templateId;
    },
    async saveChallenge() {
      const mode = this.editedChallengeId
        ? "updateChallenge"
        : "createChallenge";
      const groupId = await this.$axios.$post("/xapi", { [mode]: this.challengeData });

      const successText = this.editedChallengeId
        ? "Successfully updated challenge"
        : "Created new challenge from template";
      this.addNotification(
        `${successText}: <strong>${this.data.name}</strong>.`
      );
      this.$cookies.remove("draftId");
      this.$cookies.set("groupId", groupId);
      this.$router.replace("/group-page");
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
        this.data.days.forEach((day, dayIndex) => {
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
            while (!isEmojiValid(task.emoji, selectedEmojis)) {
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
      // temporarily commented:
      if (!this.validateData()) return;
      this.submit.loading = true;
      try {
        if (this.templateOnlyMode) {
          // -- my coding: erase draft, save template
          // find what draft it is and delete
          // delete draft (delets in server and updates DB):
          console.log(`this is draftId i deleting: ${this.draftId}`);

          await this.$axios.$post("/xapi", {
            deleteDraft: this.draftId
          });

          await this.saveTemplate();
          // --
          console.log(`i am going to dashboard`);
          return this.$router.replace("/dashboard");
        }

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
    },
    templateId(value) {
      this.$cookies.set("selectedTemplate", value);
    }
  },
  mounted() {
    const { drafts } = this.$store.getters.user;
    if (!drafts || !Object.keys(drafts).length) {
      setTimeout(() => {
        this.showIntroModal = true;
      }, 1500);
    }
    // when opening page create draft and erase template:
    const eraseTemplate = async () => {
      // immediatly create draft when opening
      await this.saveDraft();
      // if i editing template- erase it from data-base
      await this.$axios.$post("/xapi", {
        deleteTemplate: {
          templateId: this.templateId,
          isPublic: this.isPublic
        }
      });
    };
    // eraseTemplate();
  },
  provide() {
    return {
      templateOnlyMode: this.templateOnlyMode,
      editedChallengeId: this.editedChallengeId,
      isTemplateEditable: this.isTemplateEditable,
      data: this.data,
      openIntroModal: () => {
        this.showIntroModal = true;
      },
      uploading: this.uploading,
      autoSave: this.autoSave,
      submit: this.submit,
      submitHandler: this.submitHandler
    };
  }
};
</script>
