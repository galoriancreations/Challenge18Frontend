<template>
  <TransitionGroup class="challenge-editor__wrapper" :name="transition">
    <div key="content" class="challenge-editor__content" :style="{ direction }">
      <section class="challenge-editor__tabs">
        <SideTabs v-model="selectedDay" :tabs="days" />
        <ActionButton type="add" color="white" @click="addDayToEnd" />
      </section>
      <section class="challenge-editor__day" ref="container">
        <SectionHeading small>
          {{ dayTitle }}
        </SectionHeading>
        <EditDayTitleModal
          v-model.trim="options[dayIndex].title"
          :active="dayTitleEdited"
        />
        <DayActionButtons />
        <EditorTaskList :tasks="options[dayIndex].tasks" />
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
import { numbersArray, newTask } from "../../assets/util/functions";
import { rtlLanguages, dayTranslations } from "../../assets/util/options";
import uniqid from "uniqid";

export default {
  inject: [
    "options",
    "getLanguage",
    "templateOnlyMode",
    "editedChallengeId",
    "setConfirmModal",
    "getTransition",
    "setTransition",
    "submit",
    "submitHandler"
  ],
  data() {
    return {
      selectedDay: 1,
      dayTitleEdited: false
    };
  },
  computed: {
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
    dayTitle() {
      const { dayLabel, selectedDay, options, dayIndex } = this;
      const { title } = options[dayIndex];
      return `${dayLabel} ${selectedDay} – ${title || "(Edit day title)"}`;
    },
    direction() {
      return rtlLanguages.includes(this.language) ? "rtl" : null;
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
    keydownHandler(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        this.dayTitleEdited = false;
      }
    },
    addDayToStart() {
      this.options.unshift({
        id: uniqid(),
        title: "",
        tasks: [newTask(0)]
      });
      this.selectedDay = 1;
    },
    addDayToEnd() {
      this.options.push({
        id: uniqid(),
        title: "",
        tasks: [newTask(0)]
      });
      this.selectedDay = this.options.length;
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
    },
    dayTitleEdited() {
      this.setTransition(null);
    }
  },
  mounted() {
    document.addEventListener("keydown", this.keydownHandler);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.keydownHandler);
  },
  provide() {
    return {
      editDayTitle: () => {
        this.dayTitleEdited = true;
      },
      closeModal: () => {
        this.dayTitleEdited = false;
      },
      getDayIndex: () => this.dayIndex,
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
      grid-template-columns: 1fr;
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
