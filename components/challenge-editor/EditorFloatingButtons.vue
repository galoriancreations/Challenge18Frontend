<template>
  <FloatingButtons>
    <ActionButton type="info" color="white" @click="openIntroModal" />
    <ActionButton type="shuffle" color="white" @click="selectRandomOptions" />
  </FloatingButtons>
</template>

<script>
export default {
  inject: ["options", "openIntroModal", "setConfirmModal"],
  methods: {
    selectRandomOptions() {
      this.setConfirmModal(
        "Do you want to select a random option for each task? All your selections would be overwritten.",
        () => {
          this.options.forEach(day => {
            day.tasks.forEach(task => {
              const optionIndex = Math.floor(
                Math.random() * task.options.length
              );
              task.selection = task.options[optionIndex]?.text;
            });
          });
        }
      );
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  .floating-buttons {
    & > .action-button {
      outline: none;
    }
  }
}
</style>
