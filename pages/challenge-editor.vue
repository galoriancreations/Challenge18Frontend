<template>
  <Page title="Challenge Editor" name="challenge-editor">
    <WhiteSection tag="main" class="challenge-editor">
      <ErrorMessage v-if="errorLoading" :error="errorLoading" />
      <div v-else class="challenge-editor__container">
        <ChallengeOptionsInfo :active="showInfoModal" />
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
        <TransitionGroup
          tag="div"
          class="challenge-editor__wrapper"
          :name="transitionName"
        >
          <div
            class="challenge-editor__layout"
            :style="{ direction }"
            key="layout"
          >
            <section class="challenge-editor__tabs">
              <DayTabs v-model="currentDay" />
              <ActionButton type="add" color="white" @click="addDay" />
            </section>
            <section class="challenge-editor__main" ref="container">
              <SectionHeading small>
                {{ dayTitle }}
              </SectionHeading>
              <EditDayTitleModal
                v-model.trim="options[dayIndex].title"
                :active="dayTitleEdited"
              />
              <DayActionButtons />
              <TransitionGroup
                tag="div"
                class="challenge-editor__content"
                :name="transitionName"
              >
                <TaskForm
                  v-for="(task, taskIndex) in options[dayIndex].tasks"
                  :key="task.id"
                  :task="task"
                  :taskIndex="taskIndex"
                  v-model="task.selection"
                  :extraInput.sync="task.extraInput"
                />
                <div key="button">
                  <ActionButton type="add" color="white" @click="addTask" />
                </div>
              </TransitionGroup>
            </section>
          </div>
          <div key="submit-button">
            <BaseButton
              class="challenge-editor__submit-button"
              variant="blue"
              @click="submitHandler"
            >
              {{ submitButtonText }}
            </BaseButton>
          </div>
          <BaseSpinner key="spinner" v-if="submitting" />
          <ErrorMessage
            key="errorMessage"
            v-else-if="errorSubmitting"
            :error="errorSubmitting"
          />
        </TransitionGroup>
        <div class="challenge-editor__floating-buttons">
          <ActionButton
            type="info"
            color="white"
            @click="showInfoModal = true"
          />
          <ActionButton
            type="shuffle"
            color="white"
            @click="selectRandomOptions"
          />
        </div>
        <EditorNotifications />
      </div>
    </WhiteSection>
  </Page>
</template>

<script>
import {
  initialOptions,
  stripHTML,
  convertTaskText,
  newTask,
  clearedOptions
} from "../assets/util/functions";
import {
  rtlLanguages,
  dayTranslations,
  taskTranslations
} from "../assets/util/options";
import uniqid from "uniqid";
import confirmModal from "../mixins/confirm-modal";

import ChallengeOptionsInfo from "../components/challenge-editor/ChallengeOptionsInfo";
import ChallengeNameField from "../components/challenge-editor/ChallengeNameField";
import ChallengeLanguageField from "../components/challenge-editor/ChallengeLanguageField";
import TemplateAvailabilityField from "../components/challenge-editor/TemplateAvailabilityField";
import DayTabs from "../components/challenge-editor/DayTabs";
import DayActionButtons from "../components/challenge-editor/DayActionButtons";
import EditDayTitleModal from "../components/challenge-editor/EditDayTitleModal";
import TaskForm from "../components/challenge-editor/TaskForm";
import EditorNotifications from "../components/challenge-editor/EditorNotifications";

export default {
  components: {
    ChallengeOptionsInfo,
    ChallengeNameField,
    ChallengeLanguageField,
    TemplateAvailabilityField,
    DayTabs,
    DayActionButtons,
    EditDayTitleModal,
    TaskForm,
    EditorNotifications
  },
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
          options: challenge.days,
          draftId: configId,
          isTemplatePublic: false,
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
      currentDay: 1,
      dayTitleEdited: false,
      editedOption: null,
      autoSave: {
        timeout: null,
        date: null,
        saving: false,
        error: false
      },
      submitting: false,
      errorSubmitting: null,
      showInfoModal: false,
      showModeNote: true,
      transitionName: null
    };
  },
  computed: {
    editedChallengeId() {
      return this.$cookies.challengeId;
    },
    templateOnlyMode() {
      const { templateOnly } = this.$route.query;
      return templateOnly === "true" && !this.editedChallengeId;
    },
    dayIndex() {
      return this.currentDay - 1;
    },
    dayLabel() {
      return dayTranslations[this.language] || "Day";
    },
    dayTitle() {
      const { dayLabel, currentDay, options, dayIndex } = this;
      const { title } = options[dayIndex];
      return `${dayLabel} ${currentDay} – ${title || "(Edit day title)"}`;
    },
    taskLabel() {
      return taskTranslations[this.language] || "Task";
    },
    submitButtonText() {
      return this.templateOnlyMode
        ? "Finish editing"
        : this.editedChallengeId
        ? "Update challenge"
        : "Publish challenge";
    },
    convertedOptions() {
      return this.options.map(day =>
        day.tasks.map(task =>
          task.options.map(option => convertTaskText(option.text))
        )
      );
    },
    direction() {
      return rtlLanguages.includes(this.language) ? "rtl" : null;
    },
    user() {
      return this.$store.getters.user || {};
    },
    showVisibilitySelector() {
      return this.user?.accountType === "admin" && !this.editedChallengeId;
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
    async saveDraft() {
      const { draftId } = await this.$axios.$post("/xapi", {
        userID: this.user.id,
        saveDraft: {
          draftId: this.draftId,
          draftData: this.draftData
        }
      });
      this.draftId = draftId;
    },
    async saveTemplate(finishEditing = false) {
      const { templateId } = await this.$axios.$post("/xapi", {
        userID: this.user.id,
        saveTemplate: {
          templateId: this.templateId,
          templateData: this.finalTemplateData,
          draftId: this.draftId,
          finishEditing
        }
      });
      this.templateId = templateId;
    },
    autoSaveDraft() {
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
    addOptionOnEnter(event, taskIndex) {
      if (event.key === "Enter") {
        const task = this.options[this.dayIndex].tasks[taskIndex];
        const newOptionText = stripHTML(task.extraInput).trim();
        task.extraInput = "";
        if (newOptionText) {
          task.selection = newOptionText;
          task.options.push({ id: uniqid(), text: newOptionText });
          this.transitionName = null;
        }
      }
    },
    setEditedOption(taskId, optionId) {
      this.editedOption = `${taskId}-${optionId}`;
      this.transitionName = null;
    },
    editOption(value, taskIndex, optionIndex) {
      const task = this.options[this.dayIndex].tasks[taskIndex];
      task.options[optionIndex].text = stripHTML(value);
      task.selection = stripHTML(value);
    },
    finishEditOnEnter(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        this.checkForEmptyOption();
        this.editedOption = null;
      }
    },
    finishEditOnClick(event) {
      const { classList } = event.target;
      if (
        !classList.contains("icon-button") &&
        !classList.contains("task-form__option-edit")
      ) {
        this.checkForEmptyOption();
        this.editedOption = null;
      }
    },
    checkForEmptyOption() {
      if (this.editedOption) {
        const [taskId] = this.editedOption.split("-");
        const taskIndex = this.options[this.dayIndex].tasks.findIndex(
          task => task.id == taskId
        );
        const { options } = this.options[this.dayIndex].tasks[taskIndex];
        this.options[this.dayIndex].tasks[taskIndex].options = options.filter(
          option => !!option.text.trim()
        );
      }
    },
    deleteOption(taskIndex, optionIndex) {
      const { options } = this.options[this.dayIndex].tasks[taskIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this option? This action is irreversible.",
        () => {
          options.splice(optionIndex, 1);
          this.transitionName = "task";
        },
        options[optionIndex].text.length < 50
      );
    },
    addTask() {
      this.options[this.dayIndex].tasks.push(newTask());
      this.transitionName = null;
    },
    deleteTask(taskIndex) {
      const { tasks } = this.options[this.dayIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this task and all its options? This action is irreversible.",
        () => {
          this.transitionName = "task";
          tasks.splice(taskIndex, 1);
        },
        !tasks[taskIndex].options.length
      );
    },
    toggleTaskAsBonus(taskIndex) {
      const task = this.options[this.dayIndex].tasks[taskIndex];
      task.isBonus = !task.isBonus;
    },
    addDay() {
      this.options.push({
        id: uniqid(),
        title: "",
        tasks: [newTask(), newTask()]
      });
      this.currentDay = this.options.length;
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its tasks? This action is irreversible.",
        () => {
          this.options.splice(this.dayIndex, 1);
          this.transitionName = "task";
          if (this.currentDay > this.options.length) {
            this.currentDay--;
          }
        }
      );
    },
    closeAllModals() {
      this.dayTitleEdited = false;
      this.showInfoModal = false;
    },
    selectRandomOptions() {
      this.setConfirmModal(
        "Do you want to select a random option for each task? All your selections would be overwritten.",
        () => {
          this.options = this.options.map(day => ({
            ...day,
            tasks: day.tasks.map(task => {
              const optionIndex = Math.floor(
                Math.random() * task.options.length
              );
              return {
                ...task,
                selection: task.options[optionIndex]?.text
              };
            })
          }));
        }
      );
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
        this.errorSubmitting = "Challenge name can't be empty";
        return false;
      }
      if (!this.language) {
        this.errorSubmitting = "Please choose a language for the template";
        return false;
      }
      for (let day of this.options) {
        if (!day.title) {
          this.errorSubmitting = "One or more days was left without a title";
          return false;
        }
        if (!day.tasks.length) {
          this.errorSubmitting = "One or more days was left empty";
          return false;
        }
        const dayIndex = this.options.indexOf(day);
        for (let task of day.tasks) {
          if (!task.options.length) {
            this.errorSubmitting = "One or more tasks was left empty";
            return false;
          }
          if (!this.templateOnlyMode) {
            const taskIndex = day.tasks.indexOf(task);
            if (!this.isSelectionMatching(dayIndex, taskIndex)) {
              this.errorSubmitting = "One or more tasks was left empty";
              return false;
            }
          }
        }
      }
      return true;
    },
    async createNewChallenge() {
      const { challenge } = await this.$axios.$post("/xapi", {
        userID: this.user.id,
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
        userID: this.user.id,
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
      this.errorSubmitting = null;
      this.submitting = true;
      clearTimeout(this.autoSave.timeout);
      try {
        if (this.templateOnlyMode) {
          await this.saveTemplateAndRedirect();
        } else if (this.editedChallengeId) {
          await this.updateChallenge();
        } else {
          await this.createNewChallenge();
        }
      } catch (error) {
        this.errorSubmitting = error;
        this.submitting = false;
      }
    }
  },
  watch: {
    currentDay() {
      this.transitionName = null;
      const optionsTop = this.$refs.container.getBoundingClientRect().top;
      window.scrollTo(0, window.scrollY + optionsTop - 150);
    },
    name() {
      this.autoSaveDraft();
    },
    language() {
      this.autoSaveDraft();
    },
    options: {
      handler() {
        this.autoSaveDraft();
      },
      deep: true
    },
    draftId(value) {
      this.$cookies.set("draftId", value);
    }
  },
  mounted() {
    if (this.errorLoading) return;
    document.addEventListener("click", this.finishEditOnClick);
    if (!this.user?.drafts) {
      setTimeout(() => {
        this.showInfoModal = true;
      }, 1500);
    }
    setTimeout(() => {
      this.showModeNote = false;
      setTimeout(() => {
        this.showModeNote = true;
      }, 7000);
    }, 7000);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.finishEditOnClick);
  },
  provide() {
    return {
      options: this.options,
      getDayIndex: () => this.dayIndex,
      getDayLabel: () => this.dayLabel,
      editDayTitle: () => {
        this.dayTitleEdited = true;
      },
      deleteDay: this.deleteDay,
      getTaskLabel: () => this.taskLabel,
      toggleTaskAsBonus: this.toggleTaskAsBonus,
      deleteTask: this.deleteTask,
      templateOnlyMode: this.templateOnlyMode,
      editedChallengeId: this.editedChallengeId,
      getEditedOption: () => this.editedOption,
      setEditedOption: this.setEditedOption,
      getConvertedOptions: () => this.convertedOptions,
      deleteOption: this.deleteOption,
      editOption: this.editOption,
      finishEditOnEnter: this.finishEditOnEnter,
      addOptionOnEnter: this.addOptionOnEnter,
      autoSave: this.autoSave
    };
  }
};
</script>

<style lang="scss">
.challenge-editor {
  .section-seperator {
    margin: 8.5rem 0 9.5rem;

    @include respond(mobile) {
      margin: 6rem 0;
    }
  }

  &__layout {
    display: grid;
    justify-content: space-between;
    align-items: start;
    grid-template-columns: 15% 72.5%;
    position: relative;

    @include respond(tablet) {
      grid-template-columns: 1fr;
      gap: 9rem;
    }

    @include respond(mobile) {
      gap: 7rem;
    }
  }

  &__floating-buttons {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 15;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @include respond(mobile) {
      bottom: 1.5rem;
      right: 1.5rem;
      gap: 1rem;
    }
  }

  & &__submit-button {
    font-weight: 600;
    margin-top: 9rem;
    width: 100%;
    max-width: 35rem;

    @include respond(mobile) {
      margin-top: 6rem;
    }
  }
}

.task-leave-from {
  transform: translateX(0);
}

.task-leave-to {
  transform: translateX(100vw);
}

.task-leave-active {
  transition: all 0.5s;
  position: absolute;
}

.task-move {
  transition: transform 0.4s 0.4s;
}

.challenge-editor__layout[style="direction: rtl;"] {
  .task-leave-to {
    transform: translateX(-100vw);
  }

  .task-leave-active {
    position: relative;
  }
}
</style>
