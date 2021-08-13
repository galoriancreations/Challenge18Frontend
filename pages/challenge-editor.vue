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
        <FloatingNotes>
          <AutoSaveNote
            :date="lastAutoSave"
            :saving="saving"
            :error="errorAutoSave"
          />
        </FloatingNotes>
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
              <ActionButton color="white" @click="addDay">
                <i class="fas fa-plus" />
              </ActionButton>
            </section>
            <section class="challenge-editor__main" ref="container">
              <SectionHeading small>
                {{ dayTitle }}
              </SectionHeading>
              <EditDayTitleModal
                v-model.trim="options[dayIndex].title"
                :active="dayTitleEdited"
              />
              <div class="challenge-editor__day-actions">
                <div class="challenge-editor__day-actions-wrapper">
                  <IconButton type="edit" @click="dayTitleEdited = true" />
                  <IconButton
                    v-if="options.length > 1"
                    type="delete"
                    @click="deleteDay"
                  />
                </div>
              </div>
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
                  v-model="selections[dayIndex][taskIndex]"
                  :extraInput.sync="extraInputs[dayIndex][taskIndex]"
                />
                <div key="button">
                  <ActionButton color="white" @click="addTask">
                    <i class="fas fa-plus" />
                  </ActionButton>
                </div>
              </TransitionGroup>
            </section>
          </div>
          <div key="submit-button">
            <BaseButton
              class="submit-button"
              variant="blue"
              @click="submitHandler"
            >
              {{ submitButtonText }}
            </BaseButton>
          </div>
        </TransitionGroup>
        <BaseSpinner v-if="submitting" />
        <ErrorMessage v-else-if="errorSubmitting" :error="errorSubmitting" />
        <div class="challenge-editor__floating-buttons">
          <ActionButton color="white" @click="showInfoModal = true">
            <i class="fas fa-info" />
          </ActionButton>
          <ActionButton color="white" @click="selectRandomOptions">
            <i class="fas fa-random" />
          </ActionButton>
        </div>
      </div>
    </WhiteSection>
  </Page>
</template>

<script>
import {
  emptyDays,
  initialOptions,
  initialSelections,
  initialExtraInputs,
  stripHTML,
  convertTaskText
} from "../assets/util/functions";
import {
  rtlLanguages,
  dayTranslations,
  taskTranslations
} from "../assets/util/options";
import uniqid from "uniqid";

import ChallengeOptionsInfo from "../components/challenge-editor/ChallengeOptionsInfo";
import FloatingNotes from "../components/layout/FloatingNotes";
import AutoSaveNote from "../components/challenge-editor/AutoSaveNote";
import ChallengeNameField from "../components/challenge-editor/ChallengeNameField";
import ChallengeLanguageField from "../components/challenge-editor/ChallengeLanguageField";
import TemplateAvailabilityField from "../components/challenge-editor/TemplateAvailabilityField";
import DayTabs from "../components/challenge-editor/DayTabs";
import TaskForm from "../components/challenge-editor/TaskForm";
import EditDayTitleModal from "../components/challenge-editor/EditDayTitleModal";

import confirmModal from "../mixins/confirm-modal";

export default {
  components: {
    ChallengeOptionsInfo,
    FloatingNotes,
    AutoSaveNote,
    ChallengeNameField,
    ChallengeLanguageField,
    TemplateAvailabilityField,
    DayTabs,
    EditDayTitleModal,
    TaskForm
  },
  mixins: [confirmModal],
  // meta: {
  //   requiresAuth: true,
  //   forOrganizations: true
  // },
  async asyncData({ app, store, route, $axios }) {
    try {
      const draftId = app.$cookies.get("draftId");
      const { selectedTemplate, user } = store.getters;
      const { challengeId } = route.query;

      if (challengeId) {
        const { template, selections } = await $axios.$post("/xapi", {
          userID: user.id,
          getChallengeConfig: challengeId
        });
        return {
          name: template.name,
          language: template.language,
          options: template.days,
          selections,
          extraInputs: initialExtraInputs(template.days),
          draftId: null,
          isTemplatePublic: false,
          errorLoading: null
        };
      } else if (draftId) {
        const { draft } = await $axios.$post("/xapi", {
          userID: user.id,
          getDraftData: draftId
        });
        return {
          name: draft.name,
          language: draft.language,
          options: draft.days,
          selections: draft.selections,
          extraInputs: initialExtraInputs(draft.days),
          draftId,
          isTemplatePublic: draft.isTemplatePublic,
          templateId: draft.templateId,
          errorLoading: null
        };
      } else if (selectedTemplate) {
        const { template } = await $axios.$post("/xapi", {
          userID: user.id,
          getTemplateData: selectedTemplate
        });
        return {
          name: template.name,
          language: template.language,
          options: initialOptions(template.days),
          selections: initialSelections(template.days),
          extraInputs: initialExtraInputs(template.days),
          draftId: null,
          isTemplatePublic: template.isPublic && user?.accountType === "admin",
          templateId: template.id,
          errorLoading: null
        };
      } else {
        return {
          name: "",
          language: user?.language || "English",
          options: initialOptions(emptyDays()),
          selections: initialSelections(emptyDays()),
          extraInputs: initialExtraInputs(emptyDays()),
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
      submitting: false,
      errorSubmitting: null,
      autoSaveTimeout: null,
      transitionName: null,
      showInfoModal: false,
      lastAutoSave: null,
      saving: false,
      errorAutoSave: false
    };
  },
  computed: {
    editedChallengeId() {
      return this.$route.query.challengeId;
    },
    templateOnlyMode() {
      const { templateOnly, challengeId } = this.$route.query;
      return templateOnly === "true" && !challengeId;
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
      return this.$store.getters.user;
    },
    showVisibilitySelector() {
      return this.user?.accountType === "admin" && !this.editedChallengeId;
    },
    draftData() {
      return {
        name: this.name,
        language: this.language,
        days: this.options,
        selections: this.selections,
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
        days: this.options,
        isPublic: this.isTemplatePublic
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
    autoSave() {
      clearTimeout(this.autoSaveTimeout);
      this.autoSaveTimeout = setTimeout(async () => {
        this.saving = true;
        try {
          if (!this.editedChallengeId) {
            await this.saveTemplate();
          }
          await this.saveDraft();
          this.lastAutoSave = new Date();
          this.errorAutoSave = false;
        } catch {
          this.errorAutoSave = true;
        }
        this.saving = false;
      }, 5000);
    },
    updateValue(key, newValue, taskIndex) {
      this[key] = this[key].map((day, dayIndex) =>
        dayIndex === this.dayIndex
          ? day.map((oldValue, index) =>
              index === taskIndex ? newValue : oldValue
            )
          : day
      );
    },
    addOptionOnEnter(event, taskIndex) {
      if (event.key === "Enter") {
        const newOptionText = stripHTML(
          this.extraInputs[this.dayIndex][taskIndex]
        ).trim();
        this.updateValue("extraInputs", "", taskIndex);
        if (newOptionText) {
          this.updateValue("selections", newOptionText, taskIndex);
          this.options[this.dayIndex].tasks[taskIndex].options.push({
            id: uniqid(),
            text: newOptionText
          });
        }
      }
    },
    setEditedOption(taskId, optionId) {
      this.editedOption = `${taskId}-${optionId}`;
      this.transitionName = null;
    },
    editOption(value, taskIndex, optionIndex) {
      this.options[this.dayIndex].tasks[taskIndex].options[
        optionIndex
      ].text = stripHTML(value);
      this.updateValue("selections", stripHTML(value), taskIndex);
    },
    finishEditOnEnter(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        event.preventDefault();
        this.checkForEmptyOption();
        this.editedOption = null;
      }
    },
    finishEditOnClick(event) {
      if (
        !event.target.classList.contains("icon-button") &&
        !event.target.classList.contains("task-form__option-edit")
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
      this.options[this.dayIndex].tasks.push({
        id: uniqid(),
        options: [],
        isBonus: false
      });
      this.selections[this.dayIndex].push("");
      this.extraInputs[this.dayIndex].push("");
    },
    deleteTask(taskIndex) {
      const { tasks } = this.options[this.dayIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this task and all its options? This action is irreversible.",
        () => {
          this.transitionName = "task";
          tasks.splice(taskIndex, 1);
          this.selections[this.dayIndex].splice(taskIndex, 1);
          this.extraInputs[this.dayIndex].splice(taskIndex, 1);
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
        tasks: [
          { id: uniqid(), options: [] },
          { id: uniqid(), options: [] }
        ]
      });
      this.selections.push(["", ""]);
      this.extraInputs.push(["", ""]);
      this.currentDay = this.options.length;
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its tasks? This action is irreversible.",
        () => {
          this.options.splice(this.dayIndex, 1);
          this.selections.splice(this.dayIndex, 1);
          this.extraInputs.splice(this.dayIndex, 1);
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
          this.selections = this.options.map(day =>
            day.tasks.map(task => {
              const optionIndex = Math.floor(
                Math.random() * task.options.length
              );
              return task.options[optionIndex]?.text;
            })
          );
        }
      );
    },
    isSelectionMatching(dayIndex, taskIndex) {
      for (let option of this.options[dayIndex].tasks[taskIndex].options) {
        if (option.text === this.selections[dayIndex][taskIndex]) {
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
          draftData: this.draftData,
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
          draftData: this.draftData
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
      clearTimeout(this.autoSaveTimeout);
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
      this.autoSave();
    },
    language() {
      this.autoSave();
    },
    options: {
      handler() {
        this.autoSave();
      },
      deep: true
    },
    selections: {
      handler() {
        this.autoSave();
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
  },
  beforeDestroy() {
    document.removeEventListener("click", this.finishEditOnClick);
  },
  provide() {
    return {
      options: this.options,
      getDayIndex: () => this.dayIndex,
      getDayLabel: () => this.dayLabel,
      getTaskLabel: () => this.taskLabel,
      toggleTaskAsBonus: this.toggleTaskAsBonus,
      deleteTask: this.deleteTask,
      templateOnlyMode: this.templateOnlyMode,
      getEditedOption: () => this.editedOption,
      setEditedOption: this.setEditedOption,
      getConvertedOptions: () => this.convertedOptions,
      deleteOption: this.deleteOption,
      editOption: this.editOption,
      finishEditOnEnter: this.finishEditOnEnter,
      addOptionOnEnter: this.addOptionOnEnter
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
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    position: relative;

    @include respond(tablet) {
      flex-direction: column;
      align-items: center;
    }
  }

  &__tabs {
    width: 15%;

    @include respond(tablet) {
      margin-bottom: 9rem;
      width: 100%;
    }

    @include respond(mobile) {
      margin-bottom: 7rem;
    }
  }

  &__main {
    width: 72.75%;

    @include respond(tablet) {
      width: 100%;
    }

    .section-heading {
      max-width: 100%;
    }
  }

  &__day-actions {
    margin: -1rem 0 6rem;

    @include respond(mobile) {
      margin: -0.5rem 0 4.5rem;
    }
  }

  &__day-actions-wrapper {
    display: flex;
    justify-content: center;
    margin: 0 -1rem;

    .icon-button {
      margin: 0 1rem;
      font-size: 2rem;

      @include respond(mobile) {
        font-size: 1.9rem;
      }
    }
  }

  .action-button {
    box-shadow: $boxshadow2;
    width: 6.5rem;
    height: 6.5rem;
    font-size: 1.9rem;
    position: relative;
    z-index: 5;

    @include respond(mobile) {
      width: 6rem;
      height: 6rem;
      font-size: 1.6rem;
    }
  }

  &__floating-buttons {
    position: fixed;
    bottom: 3rem;
    right: 3rem;
    z-index: 5;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @include respond(mobile) {
      bottom: 1.5rem;
      right: 1.5rem;
      gap: 1rem;
    }
  }

  .submit-button {
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

.challenge-editor__layout[style="direction: rtl;"] .task-leave-to {
  transform: translateX(-100vw);
}

.task-leave-active {
  transition: all 0.5s;
  position: absolute;
}

.task-move {
  transition: transform 0.4s 0.4s;
}
</style>
