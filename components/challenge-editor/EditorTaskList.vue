<template>
  <TransitionGroup class="challenge-editor__tasks" :name="transitionName">
    <TaskForm v-for="task in tasks" :key="task.id" :task="task" />
    <div key="add-button">
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
  inject: ["getTransition", "setTransition", "setConfirmModal"],
  computed: {
    transitionName() {
      return this.getTransition();
    }
  },
  methods: {
    addTask() {
      this.tasks.push(newTask());
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
  provide() {
    return {
      deleteTask: this.deleteTask
    };
  }
};
</script>
