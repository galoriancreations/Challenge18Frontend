<template>
  <div class="floating-note">
    <slot />
  </div>
</template>

<style lang="scss">
.floating-note {
  position: fixed;
  bottom: 3rem;
  left: 3rem;
  z-index: 5;
  box-shadow: $boxshadow2;
  border-radius: 0.8rem;
  padding: 1.5rem 2rem;
  background-color: #fff;
  z-index: 10;

  @include respond(mobile) {
    bottom: 1.5rem;
    left: 1.5rem;
  }
}
</style>
