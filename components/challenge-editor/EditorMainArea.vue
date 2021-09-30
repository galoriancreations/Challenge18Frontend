<template>
  <TransitionGroup class="challenge-editor__wrapper" :name="transition">
    <div key="content" class="challenge-editor__content" :style="{ direction }">
      <section class="challenge-editor__tabs">
        <SideTabs v-model="selectedDay" :tabs="days" />
        <ActionButton
          v-if="isTemplateEditable"
          type="add"
          color="white"
          @click="addDay"
        />
      </section>
      <section class="challenge-editor__day" ref="container">
        <DayTitleField
          :key="`title-${options[dayIndex].id}`"
          v-model.trim="options[dayIndex].title"
          :label="`${dayLabel} ${selectedDay}`"
        />
        <DayActionButtons
          v-if="showActionButtons"
          :key="`actions-${options[dayIndex].id}`"
        />
        <TransitionGroup
          tag="div"
          class="challenge-editor__day-content"
          :name="transition"
        >
          <div
            :key="`introduction-${options[dayIndex].id}`"
            class="challenge-editor__subsection"
          >
            <DayIntroductionField
              :key="options[dayIndex].id"
              v-model="options[dayIndex].introduction"
            />
          </div>
          <div
            v-if="showTasks"
            :key="`tasks-${options[dayIndex].id}`"
            class="challenge-editor__subsection"
          >
            <h3 class="challenge-editor__subsection-heading">
              Day Tasks
            </h3>
            <EditorTaskList :tasks="options[dayIndex].tasks" />
          </div>
          <div
            v-if="showAdditionalMessages"
            :key="`messages-${options[dayIndex].id}`"
            class="challenge-editor__subsection"
          >
            <h3 class="challenge-editor__subsection-heading">
              Day Messages
            </h3>
            <AdditionalMessagesList :messages="options[dayIndex].messages" />
          </div>
        </TransitionGroup>
      </section>
    </div>
    <div key="submit" class="challenge-editor__submit-wrapper">
      <BaseButton variant="blue" @click="submitHandler">
        {{ submitButtonText }}
      </BaseButton>
      <BaseSpinner v-if="submit.loading" />
      <ErrorMessage v-else-if="submit.error" :error="submit.error" />
    </div>
  </TransitionGroup>
</template>

<script>
import { newMessage, newTask } from "../../assets/util/functions";
import { rtlLanguages, dayTranslations } from "../../assets/util/options";
import uniqid from "uniqid";

export default {
  inject: [
    "getOptions",
    "getLanguage",
    "templateOnlyMode",
    "editedChallengeId",
    "isTemplateEditable",
    "setConfirmModal",
    "getTransition",
    "setTransition",
    "submit",
    "submitHandler"
  ],
  data() {
    return {
      selectedDay: 1
    };
  },
  computed: {
    options() {
      return this.getOptions();
    },
    transition() {
      return this.getTransition();
    },
    language() {
      return this.getLanguage();
    },
    days() {
      return this.options.map((day, index) => ({
        id: day.id,
        value: index + 1,
        label: `${this.dayLabel} ${index + 1}`
      }));
    },
    dayIndex() {
      return this.selectedDay - 1;
    },
    dayLabel() {
      return dayTranslations[this.language] || "Day";
    },
    direction() {
      return rtlLanguages.includes(this.language) ? "rtl" : null;
    },
    showActionButtons() {
      return this.isTemplateEditable && this.options.length > 1;
    },
    showTasks() {
      return (
        this.isTemplateEditable || this.options[this.dayIndex].tasks.length > 0
      );
    },
    showAdditionalMessages() {
      const { messages } = this.options[this.dayIndex];
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
      this.options.push({
        id: uniqid(),
        title: "",
        tasks: [newTask(0)],
        messages: [newMessage()]
      });
      this.selectedDay = this.options.length;
      this.setTransition("task");
    },
    deleteDay() {
      this.setConfirmModal(
        "Are you sure you want to delete this day and all its tasks? This action is irreversible.",
        () => {
          this.setTransition("task");
          this.options.splice(this.dayIndex, 1);
          if (this.selectedDay > this.options.length) {
            this.selectedDay--;
          }
        }
      );
    }
  },
  watch: {
    selectedDay() {
      this.setTransition("task");
      const optionsTop = this.$refs.container.getBoundingClientRect().top;
      window.scrollTo(0, window.scrollY + optionsTop - 150);
    }
  },
  provide() {
    return {
      deleteDay: this.deleteDay
    };
  }
};
</script>

<style lang="scss">
.challenge-editor {
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
    transform: translateX(-100vw);

    @include respond(mobile) {
      transform: translateX(-150vw);
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
