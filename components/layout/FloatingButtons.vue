<template>
  <div class="floating-buttons">
    <slot />
  </div>
</template>

<style lang="scss">
.floating-buttons {
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
</style>
