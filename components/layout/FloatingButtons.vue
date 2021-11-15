<template>
  <div class="floating-buttons">
    <slot />
  </div>
</template>

<style lang="scss">
.floating-buttons {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 15;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @include respond(mobile) {
    bottom: 1rem;
    right: 1rem;
    gap: 1rem;
  }

  & > * {
    box-shadow: $boxshadow2;
  }
}
</style>
