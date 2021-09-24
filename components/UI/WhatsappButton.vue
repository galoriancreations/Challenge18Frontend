<template>
  <a href="https://wa.me/972559721123" target="_blank">
    <img class="whatsapp-icon" src="~/assets/images/icons8-whatsapp.svg" />
  </a>
</template>

<style lang="scss">
.whatsapp-icon {
  width: 5.5rem;
  height: 5.5rem;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 5;

  @include respond(mobile) {
    width: 4.5rem;
    height: 4.5rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }
}
</style>
