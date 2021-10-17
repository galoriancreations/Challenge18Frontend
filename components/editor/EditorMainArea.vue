<template>
  <TransitionGroup tag="div" class="editor__wrapper" :name="transition">
    <div key="content" class="editor__content" :style="{ direction }">
      <section class="editor__tabs">
        <SideTabs v-model="selectedDay" :tabs="days" />
        <ActionButton
          v-if="isTemplateEditable"
          type="add"
          color="white"
          @click="addDay"
        />
      </section>
      <section class="editor__day" ref="container">
        <DayTitleField
          :key="`title-${dayData.id}`"
          v-model.trim="dayData.title"
          :label="`${dayLabel} ${selectedDay}`"
        />
        <DayActionButtons
          v-if="showActionButtons"
          :key="`actions-${dayData.id}`"
        />
        <TransitionGroup
          tag="div"
          class="editor__day-content"
          :name="transition"
        >
          <div :key="`introduction-${dayData.id}`" class="editor__subsection">
            <DayIntroductionField
              :key="dayData.id"
              v-model="dayData.introduction"
            />
          </div>
          <div
            v-if="showTasks"
            :key="`tasks-${dayData.id}`"
            class="editor__subsection"
          >
            <h3 class="editor__subsection-heading">
              Day Tasks
            </h3>
            <EditorTaskList :tasks="dayData.tasks" />
          </div>
          <div
            v-if="showAdditionalMessages"
            :key="`messages-${dayData.id}`"
            class="editor__subsection"
          >
            <h3 class="editor__subsection-heading">
              Day Messages
            </h3>
            <AdditionalMessagesList :messages="dayData.messages" />
          </div>
        </TransitionGroup>
      </section>
    </div>
    <div key="submit" class="editor__submit-wrapper">
      <BaseButton
        variant="blue"
        @click="submitHandler"
        :disabled="submit.loading"
      >
        {{ submitButtonText }}
      </BaseButton>
      <BaseSpinner v-if="submit.loading" />
      <ErrorMessage v-else-if="submit.error" :error="submit.error" />
    </div>
  </TransitionGroup>
</template>

<script>
import { newMessage, newTask } from "~/assets/util/functions";
import { rtlLanguages, dayTranslations } from "~/assets/util/options";
import uniqid from "uniqid";

export default {
  inject: [
    "data",
    "templateOnlyMode",
    "editedChallengeId",
    "isTemplateEditable",
    "setConfirmModal",
    "submit",
    "submitHandler"
  ],
  data() {
    return {
      selectedDay: 1,
      transition: "task"
    };
  },
  computed: {
    days() {
      return this.data.days.map((day, index) => ({
        id: day.id,
        value: index + 1,
        label: `${this.dayLabel} ${index + 1}`
      }));
    },
    dayIndex() {
      return this.selectedDay - 1;
    },
    dayLabel() {
      return dayTranslations[this.data.language] || "Day";
    },
    direction() {
      return rtlLanguages.includes(this.data.language) ? "rtl" : null;
    },
    showActionButtons() {
      return this.isTemplateEditable && this.data.days.length > 1;
    },
    dayData() {
      return this.data.days[this.dayIndex];
    },
    showTasks() {
      return this.isTemplateEditable || this.dayData.tasks.length > 0;
    },
    showAdditionalMessages() {
      const { messages } = this.dayData;
      const hasContent = () => {
        for (let message of messages) {
          if (message.content.trim()) return true;
        }
        return false;
      };
      const isEmpty = !messages.length || !hasContent();
      return this.isTemplateEditable || !isEmpty;
    },
    submitButtonText() {
      return this.templateOnlyMode
        ? "Finish editing"
        : this.editedChallengeId
        ? "Update challenge"
        : "Publish challenge";
    }
  },
  methods: {
    addDay() {
      this.data.days.push({
        id: uniqid(),
        title: "",
        tasks: [newTask(0)],
        messages: [newMessage()]
      });
      this.selectedDay = this.data.days.length;
      this.transition = "task";
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its tasks? This action is irreversible.",
        () => {
          this.transition = "task";
          this.data.days.splice(this.dayIndex, 1);
          if (this.selectedDay > this.data.days.length) {
            this.selectedDay--;
          }
        }
      );
    }
  },
  watch: {
    selectedDay() {
      this.transition = "task";
      const optionsTop = this.$refs.container.getBoundingClientRect().top;
      window.scrollTo(0, window.scrollY + optionsTop - 150);
    }
  },
  provide() {
    return {
      deleteDay: this.deleteDay,
      getTransition: () => this.transition,
      setTransition: value => {
        this.transition = value;
      }
    };
  }
};
</script>

<style lang="scss">
.editor {
  &__content {
    display: grid;
    justify-content: space-between;
    align-items: start;
    grid-template-columns: 15% 72.5%;
    position: relative;

    @include respond(tablet) {
      grid-template-columns: 100%;
      gap: 9rem;
    }

    @include respond(mobile) {
      gap: 7rem;
    }
  }

  &__tabs {
    .side-tabs {
      margin-bottom: 3rem;
    }
  }

  &__day {
    position: relative;
  }

  &__day-title + &__day-content {
    padding-top: 2rem;
  }

  &__subsection {
    position: relative;
    z-index: 5;

    &:not(:last-child) {
      margin-bottom: 9rem;

      @include respond(mobile) {
        margin-bottom: 7rem;
      }
    }
  }

  &__subsection-heading {
    text-align: center;
    font-weight: 600;
    color: $color-blue-2;
    font-size: 2.7rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.1rem;
      margin-bottom: 2.5rem;
    }
  }

  &__submit-wrapper {
    margin-top: 9rem;
    position: relative;
    z-index: 5;

    @include respond(mobile) {
      margin-top: 6rem;
    }

    .button {
      font-weight: 600;
      width: 100%;
      max-width: 35rem;
    }
  }
}

.task-leave-to,
.task-delete-leave-to {
  transform: translateX(100vw);

  @include respond(mobile) {
    transform: translateX(150vw);
  }
}

[style="direction: rtl;"] {
  .task-leave-to,
  .task-delete-leave-to {
    transform: translateX(-100vw) !important;

    @include respond(mobile) {
      transform: translateX(-150vw) !important;
    }
  }
}

.task-leave-active,
.task-delete-leave-active {
  transition: transform 0.5s;
  position: absolute;
}

.task-enter-active {
  animation: zoomIn 0.5s;
}

.task-move:not(.task-leave-active) {
  transition: transform 0.375s;
}

.task-delete-move:not(.task-delete-leave-active) {
  transition: transform 0.4s 0.4s;
}
</style>
