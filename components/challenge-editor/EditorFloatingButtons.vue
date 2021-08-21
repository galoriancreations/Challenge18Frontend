<template>
  <div class="challenge-editor__floating-buttons">
    <ActionButton type="info" color="white" @click="displayIntroModal" />
    <ActionButton type="shuffle" color="white" @click="selectRandomOptions" />
  </div>
</template>

<script>
export default {
  inject: ["options", "displayIntroModal", "setConfirmModal"],
  methods: {
    selectRandomOptions() {
      this.setConfirmModal(
        "Do you want to select a random option for each task? All your selections would be overwritten.",
        () => {
          this.options.forEach(day => {
            day.tasks = day.tasks.map(task => {
              const optionIndex = Math.floor(
                Math.random() * task.options.length
              );
              return {
                ...task,
                selection: task.options[optionIndex]?.text
              };
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
}
</style>
