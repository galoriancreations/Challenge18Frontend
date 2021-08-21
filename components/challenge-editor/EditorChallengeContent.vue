<template>
  <div class="challenge-editor__content" :style="{ direction }">
    <section class="challenge-editor__tabs">
      <SideTabs v-model="selectedDay" :tabs="days" />
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
      <EditorTaskList :tasks="options[dayIndex].tasks" />
    </section>
  </div>
</template>

<script>
import { numbersArray, newTask } from "../../assets/util/functions";
import { rtlLanguages, dayTranslations } from "../../assets/util/options";
import uniqid from "uniqid";

export default {
  inject: ["options", "getLanguage", "setConfirmModal", "setTransition"],
  data() {
    return {
      selectedDay: 1,
      dayTitleEdited: false
    };
  },
  computed: {
    language() {
      return this.getLanguage();
    },
    days() {
      return numbersArray(this.options.length).map(day => ({
        id: `day-${day}`,
        value: day,
        label: `${this.dayLabel} ${day}`
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
    }
  },
  methods: {
    keydownHandler(event) {
      if (event.key === "Enter" || event.key === "Escape") {
        this.dayTitleEdited = false;
      }
    },
    addDay() {
      this.options.push({
        id: uniqid(),
        title: "",
        tasks: [newTask(), newTask()]
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
      selectedDayTasks: () => this.options[this.dayIndex].tasks,
      editDayTitle: () => {
        this.dayTitleEdited = true;
      },
      deleteDay: this.deleteDay,
      closeModal: () => {
        this.dayTitleEdited = false;
      }
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

  &__main {
    position: relative;
  }
}
</style>
