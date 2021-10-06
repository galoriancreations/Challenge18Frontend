<template>
  <TransitionGroup tag="div" class="challenge-editor__tasks" :name="transition">
    <TaskForm v-for="task in tasks" :key="task.id" :task="task" />
    <div v-if="isTemplateEditable" key="add" class="challenge-editor__add-task">
      <ActionButton type="add" color="white" @click="addTask" />
    </div>
  </TransitionGroup>
</template>

<script>
import { newTask } from "../../assets/util/functions";

export default {
  props: {
    tasks: Array
  },
  inject: [
    "getTransition",
    "setTransition",
    "setConfirmModal",
    "isTemplateEditable"
  ],
  data() {
    return {
      editedOption: null
    };
  },
  computed: {
    transition() {
      return this.getTransition();
    }
  },
  methods: {
    setEditedOption(taskId, optionId) {
      if (this.editedOption) {
        this.checkForEmptyOption();
      }
      this.editedOption = `${taskId}-${optionId}`;
      this.setTransition(null);
    },
    finishEditOption() {
      this.checkForEmptyOption();
      this.editedOption = null;
    },
    checkForEmptyOption() {
      const [taskId] = this.editedOption.split("-");
      const task = this.tasks.find(task => task.id == taskId);
      task.options = task.options.filter(option => !!option.text.trim());
    },
    finishEditOnClick(event) {
      if (!this.editedOption) return;
      const { classList } = event.target;
      const isOutOfElement =
        !classList.contains("task-form__option-button") &&
        !classList.contains("task-form__option-edit");
      if (isOutOfElement) {
        this.finishEditOption();
      }
    },
    addTask() {
      this.tasks.push(newTask(this.tasks.length));
      this.setTransition("task");
    },
    deleteTask(taskIndex) {
      this.setConfirmModal(
        "Are you sure you want to delete this task and all its options? This action is irreversible.",
        () => {
          this.setTransition("task-delete");
          this.tasks.splice(taskIndex, 1);
        },
        !this.tasks[taskIndex].options.length
      );
    }
  },
  mounted() {
    document.addEventListener("click", this.finishEditOnClick);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.finishEditOnClick);
  },
  provide() {
    return {
      selectedDayTasks: () => this.tasks,
      getEditedOption: () => this.editedOption,
      setEditedOption: this.setEditedOption,
      finishEditOption: this.finishEditOption,
      deleteTask: this.deleteTask
    };
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__add-task {
    position: relative;
    z-index: 5;
  }
}
</style>
