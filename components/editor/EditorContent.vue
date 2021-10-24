<template>
  <TransitionGroup tag="div" class="editor__main-wrapper" :name="transition">
    <PreChallengeMessages key="pre-messages" />
    <EditorMainArea key="main-area" />
  </TransitionGroup>
</template>

<script>
export default {
  data() {
    return {
      transition: null,
      timeout: null
    };
  },
  watch: {
    transition(value) {
      if (value) {
        this.timeout = setTimeout(() => {
          this.transition = null;
        }, 1000);
      }
    }
  },
  provide() {
    return {
      getTransition: () => this.transition,
      setTransition: value => {
        clearTimeout(this.timeout);
        this.transition = value;
      }
    };
  }
};
</script>

<style lang="scss">
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
