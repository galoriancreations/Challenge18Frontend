<template>
  <div class="floating-notes">
    <slot />
  </div>
</template>

<style lang="scss">
.floating-notes {
  position: fixed;
  bottom: 3rem;
  left: 3rem;
  z-index: 10;
  max-width: 45rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  @include respond(mobile) {
    bottom: 1.5rem;
    left: 1.5rem;
    width: calc(100% - 3rem);
  }

  & > * {
    &:not(:last-child) {
      margin-bottom: 1.5rem;

      @include respond(mobile) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
