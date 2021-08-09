<template>
  <Page title="Challenge Editor" name="challenge-options">
    <WhiteSection tag="main" class="challenge-options">
      <ErrorMessage v-if="errorLoading" :error="errorLoading" />
      <div v-else class="challenge-options__container">
        <ChallengeOptionsInfo :active="showInfoModal" />
        <ConfirmModal
          :active="showConfirmModal"
          :text="confirmText"
          @confirm="confirmAction"
        />
        <section class="challenge-options__top">
          <div class="challenge-options__top-field">
            <h3 class="challenge-options__top-label">Challenge name</h3>
            <textarea-autosize
              v-model.trim="name"
              class="challenge-options__name"
              :placeholder="challengeNamePlaceholder"
              :rows="1"
              ref="name"
            />
          </div>
          <div class="challenge-options__top-field">
            <h3 class="challenge-options__top-label">Challenge language</h3>
            <v-select
              v-model="language"
              :options="languageOptions"
              :reduce="option => option.name"
              class="language-selector"
            />
          </div>
        </section>
        <SectionSeperator />
        <TransitionGroup
          tag="div"
          class="challenge-options__wrapper"
          :name="transitionName"
        >
          <div
            class="challenge-options__layout"
            :style="{ direction }"
            key="layout"
          >
            <section class="challenge-options__tabs">
              <div class="challenge-options__tabs-list">
                <div
                  v-for="day in days"
                  :key="options[day - 1].id"
                  class="challenge-options__tab"
                >
                  <input
                    type="radio"
                    v-model="currentDay"
                    :value="day"
                    :id="`day${day}`"
                  />
                  <label :for="`day${day}`">{{ dayLabel }} {{ day }}</label>
                </div>
              </div>
              <ActionButton color="white" @click="addDay">
                <i class="fas fa-plus" />
              </ActionButton>
            </section>
            <section class="challenge-options__main" ref="container">
              <SectionHeading small>
                {{ dayTitle }}
              </SectionHeading>
              <DashboardModal
                class="edit-day-title"
                :active="dayTitleEdited"
                :scrollbar="false"
              >
                <h3 class="challenge-options__top-label">Day title</h3>
                <textarea-autosize
                  v-model.trim="options[dayIndex].title"
                  class="edit-day-title__input section-heading"
                  placeholder="Enter title here"
                  :rows="1"
                  ref="dayTitle"
                />
              </DashboardModal>
              <div class="challenge-options__day-actions">
                <i
                  class="fas fa-pen options-action-button"
                  @click="dayTitleEdited = true"
                />
                <i
                  v-if="days.length > 1"
                  class="fas fa-trash-alt options-action-button"
                  @click="deleteDay"
                />
              </div>
              <TransitionGroup
                tag="div"
                class="challenge-options__content"
                :name="transitionName"
              >
                <div
                  class="task-form"
                  v-for="(task, taskIndex) in options[dayIndex].tasks"
                  :key="task.id"
                >
                  <div class="task-form__top">
                    <h3 class="task-form__title">
                      {{ `${taskLabel} ${taskIndex + 1}` }}
                      <span v-if="task.isBonus">(bonus)</span>
                    </h3>
                    <div class="task-form__top-icons">
                      <i
                        :class="{
                          'options-action-button': true,
                          fas: task.isBonus,
                          far: !task.isBonus,
                          'fa-star': true
                        }"
                        @click="toggleTaskAsBonus(taskIndex)"
                      />
                      <i
                        class="fas fa-trash-alt options-action-button"
                        @click="deleteTask(taskIndex)"
                      />
                    </div>
                  </div>
                  <div
                    v-for="(option, optionIndex) in task.options"
                    :key="option.id"
                    class="task-form__option"
                  >
                    <input
                      type="radio"
                      v-model="selections[dayIndex][taskIndex]"
                      :value="option.text"
                      :id="option.id"
                      class="task-form__radio-input"
                    />
                    <label :for="option.id" class="task-form__radio-label">
                      <span class="task-form__radio-button" />
                    </label>
                    <label
                      v-if="editedOption !== `${task.id}-${option.id}`"
                      :for="option.id"
                      class="task-form__text"
                    >
                      <span
                        v-html="
                          convertedOptions[dayIndex][taskIndex][optionIndex]
                        "
                        v-linkified
                      />
                      <div class="task-form__option-actions">
                        <div class="task-form__option-actions-wrapper">
                          <i
                            class="fas fa-pen options-action-button"
                            @click="setEditedOption(task.id, option.id)"
                          />
                          <i
                            class="fas fa-trash-alt options-action-button"
                            @click="deleteOption(taskIndex, optionIndex)"
                          />
                        </div>
                      </div>
                    </label>
                    <form v-else @keydown="finishEditOnEnter">
                      <textarea-autosize
                        :value="option.text"
                        @input="editOption($event, taskIndex, optionIndex)"
                        class="task-form__option-edit"
                        placeholder="Start typing here..."
                        :rows="1"
                      />
                    </form>
                  </div>
                  <form @keydown="addOptionOnEnter($event, taskIndex)">
                    <textarea-autosize
                      v-model.trim="extraInputs[dayIndex][taskIndex]"
                      class="task-form__extra"
                      :placeholder="newOptionPlaceholder"
                      :rows="1"
                    />
                  </form>
                </div>
                <div key="button">
                  <ActionButton color="white" @click="addTask">
                    <i class="fas fa-plus" />
                  </ActionButton>
                </div>
              </TransitionGroup>
            </section>
          </div>
          <div key="publish-button">
            <BaseButton
              class="publish-button"
              variant="blue"
              @click="submitHandler"
            >
              {{ editedChallengeId ? "Update" : "Publish" }} challenge
            </BaseButton>
          </div>
        </TransitionGroup>
        <BaseSpinner v-if="submitting" />
        <ErrorMessage v-else-if="errorSubmitting" :error="errorSubmitting" />
        <div class="challenge-options__floating-buttons">
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
  numbersArray,
  stripHTML,
  convertTaskText
} from "../assets/util/functions";
import {
  languageOptions,
  rtlLanguages,
  dayTranslations,
  taskTranslations
} from "../assets/util/options";
import uniqid from "uniqid";
import ChallengeOptionsInfo from "../components/content/ChallengeOptionsInfo";

export default {
  components: { ChallengeOptionsInfo },
  // meta: {
  //   requiresAuth: true,
  //   forOrganizations: true
  // },
  async asyncData({ app, store, route, $axios }) {
    try {
      const draftId = app.$cookies.get("draftId");
      const { selectedTemplate, user } = store.getters;
      const { challengeId } = route.query;
      console.log(challengeId);

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
      languageOptions,
      currentDay: 1,
      dayTitleEdited: false,
      editedOption: null,
      submitting: false,
      errorSubmitting: null,
      saveTimeout: null,
      transitionName: null,
      showInfoModal: false,
      showConfirmModal: false,
      confirmText: "",
      confirmAction: () => {},
      lastAutoSave: null,
      isTemplatePublic: false
    };
  },
  computed: {
    editedChallengeId() {
      return this.$route.query.challengeId;
    },
    days() {
      return numbersArray(this.options.length);
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
    challengeNamePlaceholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Enter challenge name here"
          : "Type name here"
        : null;
    },
    newOptionPlaceholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Type and press Enter to add a new option..."
          : "Enter new option here..."
        : null;
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
      return this.user?.accountType === "admin";
    },
    draftData() {
      return {
        name: this.name,
        language: this.language,
        days: this.options,
        selections: this.selections,
        templateId: this.templateId,
        challengeId: this.editedChallengeId
      };
    },
    finalTemplateData() {
      return {
        id: this.templateId,
        name: this.name,
        language: this.language,
        days: this.options
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
    async saveTemplate() {
      const { templateId } = await this.$axios.$post("/xapi", {
        userID: this.user.id,
        saveTemplate: {
          templateId: this.templateId,
          templateData: this.finalTemplateData,
          isTemplatePublic: this.isTemplatePublic
        }
      });
      this.templateId = templateId;
    },
    autoSave() {
      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(async () => {
        if (!this.editedChallengeId) {
          await this.saveTemplate();
        }
        await this.saveDraft();
        this.lastAutoSave = new Date();
      }, 3000);
    },
    setConfirmModal(text, action, altCondition) {
      if (altCondition) {
        action();
      } else {
        this.showConfirmModal = true;
        this.confirmText = text;
        this.confirmAction = action;
      }
    },
    enterKeyHandler(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (this.dayTitleEdited) {
          this.closeModal();
        }
      }
    },
    addOptionOnEnter(event, taskIndex) {
      if (event.key === "Enter") {
        event.preventDefault();
        const newOptionText = stripHTML(
          this.extraInputs[this.dayIndex][taskIndex]
        ).trim();
        if (newOptionText) {
          this.options[this.dayIndex].tasks[taskIndex].options.push({
            id: uniqid(),
            text: newOptionText
          });
          this.selections[this.dayIndex][taskIndex] = newOptionText;
        }
        this.extraInputs[this.dayIndex][taskIndex] = "";
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
      this.selections[this.dayIndex][taskIndex] = stripHTML(value);
    },
    finishEditOnEnter(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        this.checkForEmptyOption();
        this.editedOption = null;
      }
    },
    finishEditOnClick(event) {
      if (
        !event.target.classList.contains("options-action-button") &&
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
      this.options[this.dayIndex].tasks[taskIndex].options.splice(
        optionIndex,
        1
      );
      this.transitionName = "task";
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
      this.setConfirmModal(
        "Are you sure you want to delete this task and all its options? This action is irreversible.",
        () => {
          this.transitionName = "task";
          this.options[this.dayIndex].tasks.splice(taskIndex, 1);
          this.selections[this.dayIndex].splice(taskIndex, 1);
          this.extraInputs[this.dayIndex].splice(taskIndex, 1);
        },
        !this.options[this.dayIndex].tasks[taskIndex].options.length
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
            this.currentDay -= 1;
          }
        },
        !this.options[this.dayIndex].tasks.length
      );
    },
    closeModal() {
      this.dayTitleEdited = false;
      this.showInfoModal = false;
      this.showConfirmModal = false;
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
      for (let option of this.options[dayIndex].tasks[taskIndex]) {
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
          const taskIndex = day.tasks.indexOf(task);
          if (!this.isSelectionMatching(dayIndex, taskIndex)) {
            this.errorSubmitting = "One or more tasks was left empty";
            return false;
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
          draftData: this.draftData
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
    async submitHandler() {
      if (!this.validateData()) return;
      this.errorSubmitting = null;
      this.submitting = true;
      try {
        if (this.editedChallengeId) {
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
    },
    dayTitleEdited(value) {
      if (value) {
        setTimeout(() => this.$refs.dayTitle.$el.focus(), 100);
      }
    }
  },
  mounted() {
    if (this.errorLoading) return;

    setTimeout(() => {
      this.$refs.name.$el.addEventListener("keydown", this.enterKeyHandler);
      this.$refs.dayTitle.$el.addEventListener("keydown", this.enterKeyHandler);
      document.addEventListener("click", this.finishEditOnClick);
    }, 1000);

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
      closeModal: this.closeModal
    };
  }
};
</script>

<style lang="scss">
@import "@/assets/sass/base.scss";

.challenge-options {
  &__top {
    text-align: center;
  }

  &__top-field {
    display: flex;
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 4rem;

      @include respond(mobile) {
        margin-bottom: 3.5rem;
      }
    }

    input {
      text-align: center;
      border: none;
      outline: none;
    }
  }

  &__top-label {
    font-weight: 500;
    font-size: 1.85rem;
    margin-bottom: 1.2rem;

    @include respond(mobile) {
      font-size: 1.65rem;
    }
  }

  &__name {
    font: inherit;
    font-size: 5rem;
    font-family: "Spartan", sans-serif;
    letter-spacing: -0.5px;
    font-weight: 600;
    color: $color-blue-2;
    border: none;
    outline: none;
    text-align: center;

    @include respond(mobile) {
      font-size: 3rem;
    }
  }

  &__language {
    font: inherit;
    font-size: 2.5rem;

    @include respond(mobile) {
      font-size: 2rem;
    }
  }

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

  &__tabs-list {
    box-shadow: $boxshadow2;
    display: grid;
    grid-template-columns: 1fr;
    overflow: hidden;
    position: relative;
    background-color: rgba(#eee, 0.5);
    margin-bottom: 3.5rem;

    @include respond(desktop) {
      border-radius: 0.8rem;
    }

    @include respond(tablet) {
      grid-template-columns: repeat(6, 1fr);
    }

    @include respond(mobile-land) {
      grid-template-columns: repeat(3, 1fr);
    }

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__tab {
    @include respond(tablet) {
      border-bottom: 0.1rem solid #ccc;
    }

    &:not(:last-child) {
      @include respond(desktop) {
        border-bottom: 0.1rem solid #ccc;
      }
    }

    &:not(:nth-child(6n)) {
      @include respond(tablet) {
        border-right: 0.1rem solid #ccc;
      }

      @include respond(mobile-land) {
        border-right: none;
      }
    }

    &:not(:nth-child(3n)) {
      @include respond(mobile-land) {
        border-right: 0.1rem solid #ccc;
      }
    }

    &:nth-child(6n + 1):nth-last-child(-n + 6),
    &:nth-child(6n + 1):nth-last-child(-n + 6) ~ & {
      @include respond(tablet) {
        border-bottom: none;
      }

      @include respond(mobile-land) {
        border-bottom: 0.1rem solid #ccc;
      }
    }

    &:nth-child(3n + 1):nth-last-child(-n + 3),
    &:nth-child(3n + 1):nth-last-child(-n + 3) ~ & {
      @include respond(mobile-land) {
        border-bottom: none !important;
      }
    }

    input {
      display: none;
    }

    label {
      display: block;
      cursor: pointer;
      width: 100%;
      height: 100%;
      border: 0.3rem solid transparent;
      padding: 1.5rem;
      text-align: center;
      font-weight: 600;
      font-size: 1.8rem;
      background-color: #fff;
      transition: all 0.5s;
      position: relative;

      @include respond(mobile) {
        font-size: 1.6rem;
      }

      &:hover {
        background-color: rgba($color-azure-light, 0.8);
        z-index: 1;
      }
    }

    &:first-child label {
      @include respond(desktop) {
        border-radius: 0.8rem 0.8rem 0 0;
      }
    }

    &:last-child label {
      @include respond(desktop) {
        border-radius: 0 0 0.8rem 0.8rem;
      }
    }

    input:checked + label {
      background-color: rgba($color-azure-light, 0.8);
      border-color: $color-azure;
      z-index: 1;
    }
  }

  &__layout[style="direction: rtl;"] {
    .challenge-options__tab {
      &:not(:nth-child(6n)) {
        border-right: none;

        @include respond(tablet) {
          border-left: 0.1rem solid #ccc;
        }

        @include respond(mobile-land) {
          border-left: none;
        }
      }

      &:not(:nth-child(3n)) {
        border-right: none;

        @include respond(mobile-land) {
          border-left: 0.1rem solid #ccc;
        }
      }
    }

    .task-form__option-actions {
      right: initial;
      left: 0;
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
    display: grid;
    grid-template-columns: repeat(2, min-content);
    justify-content: center;
    gap: 2rem;
    margin: -1rem 0 6rem;

    @include respond(mobile) {
      margin: -0.5rem 0 4.5rem;
    }

    .options-action-button {
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

  .publish-button {
    font-weight: 600;
    margin-top: 9rem;
    width: 100%;
    max-width: 35rem;

    @include respond(mobile) {
      margin-top: 6rem;
    }
  }
}

.task-form {
  border-radius: 1rem;
  box-shadow: $boxshadow2;
  padding: 3.5rem 3rem;
  width: 100%;
  overflow: hidden;

  @include respond(mobile) {
    padding: 3rem 2rem;
  }

  &:not(:last-child) {
    margin-bottom: 4rem;

    @include respond(mobile) {
      margin-bottom: 3rem;
    }
  }

  &__top {
    margin-bottom: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__top-icons {
    transition: all 0.5s;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(2, min-content);

    @media (hover: hover) {
      opacity: 0;
      visibility: hidden;
    }
  }

  &:hover &__top-icons {
    opacity: 1;
    visibility: visible;
  }

  &__title {
    color: $color-blue-2;
    font-size: 2.8rem;

    @include respond(mobile) {
      font-size: 2.2rem;
    }
  }

  &__option {
    line-height: 1.7;
    display: grid;
    grid-template-columns: 2.8rem 1fr;
    gap: 1.5rem;
    align-items: center;

    @include respond(mobile) {
      line-height: 1.6;
      grid-template-columns: 2.6rem 1fr;
      gap: 1.2rem;
    }

    &:not(:last-child) {
      margin-bottom: 2.5rem;

      @media (hover: hover) {
        margin-bottom: 1.5rem;
      }
    }
  }

  &__radio-input {
    display: none;
  }

  &__radio-button {
    display: block;
    height: 2.8rem;
    width: 2.8rem;
    border: 0.5rem solid $color-azure;
    border-radius: 50%;
    cursor: pointer;
    position: relative;

    @include respond(mobile) {
      height: 2.6rem;
      width: 2.6rem;
    }

    &::after {
      content: "";
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 1.3rem;
      height: 1.3rem;
      background-color: $color-azure;
      border-radius: 50%;
      opacity: 0;
      transition: opacity 0.5s;

      @include respond(mobile) {
        height: 1.1rem;
        width: 1.1rem;
      }
    }
  }

  &__radio-input:checked + &__radio-label &__radio-button::after {
    opacity: 1;
  }

  &__text {
    word-wrap: break-word;
    flex: 1;
    position: relative;

    @include respond(mobile) {
      font-size: 1.45rem;
    }

    span {
      display: block;
    }

    a {
      color: $color-blue-2;
      transition: color 0.5s;

      &:hover {
        color: $color-gold-3;
      }
    }
  }

  &__option-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba($color-azure-light, 0.6);
    border-radius: 0.4rem;
    padding: 0.5rem;
    margin-top: 0.75rem;
    transition: all 0.5s;

    @media (hover: hover) {
      position: absolute;
      width: 10rem;
      height: 100%;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      padding: 0;
      opacity: 0;
      margin-top: 0;
      visibility: hidden;
    }
  }

  &__text:hover &__option-actions {
    opacity: 1;
    visibility: visible;
  }

  &__option-actions-wrapper {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    justify-content: center;
    gap: 2rem;
  }

  &__option-edit {
    display: block;
    width: 100%;
    font: inherit;
    outline: none;
    padding: 0.8rem;
    border: 0.1rem solid #ccc;
    border-radius: 0.5rem;
    transition: all 0.5s;

    &:focus {
      border-color: $color-azure;
    }
  }

  &__extra {
    font: inherit;
    outline: none;
    width: 100%;
    padding: 1rem 2rem;
    border: 0.2rem solid #ccc;
    border-radius: 100px;
    margin-top: 1rem;
    transition: all 0.5s;

    @include respond(tablet-sm) {
      margin-top: 0.5rem;
    }

    &:focus {
      border-color: $color-azure;
    }
  }
}

.challenge-options .language-selector {
  font-weight: 600;
  font-size: 2.2rem;
  height: 4.2rem;

  @include respond(mobile) {
    font-size: 1.9rem;
    height: 3.8rem;
  }

  .vs__clear {
    display: none;
  }

  ul {
    * {
      font-size: 1.6rem;

      @include respond(mobile) {
        font-size: 1.45rem;
      }
    }
  }
}

.options-action-button {
  cursor: pointer;
  transition: all 0.5s;
  font-size: 1.7rem;

  @include respond(mobile) {
    font-size: 1.55rem;
  }

  &.fa-pen,
  &.fa-star {
    color: $color-blue-3;
  }

  &.fa-trash-alt {
    color: $color-blue-2;
  }

  &:hover {
    @media (hover: hover) {
      color: $color-azure;
    }
  }
}

.edit-day-title {
  &__input {
    border: none;
    outline: none;
    font-family: "Spartan", sans-serif;
    display: block;
    width: 100%;
    text-align: center;
    border-bottom: 0.2rem solid #ccc;
    padding: 1rem 0;
    margin-bottom: 0 !important;
    margin-top: 0.5rem;

    @include respond(mobile) {
      margin-top: 0;
    }
  }
}

.task-leave-from {
  transform: translateX(0);
}

.task-leave-to {
  transform: translateX(100vw);
}

.challenge-options__layout[style="direction: rtl;"] .task-leave-to {
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
