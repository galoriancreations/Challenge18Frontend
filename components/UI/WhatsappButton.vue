<template>
  <a href="https://wa.me/972559721123" target="_blank">
    <img class="whatsapp-icon" src="~/assets/images/icons8-whatsapp.svg" />
  </a>
</template>

<style lang="scss">
.whatsapp-icon {
  width: 6rem;
  height: 6rem;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 5;

  @include respond(mobile) {
    width: 5rem;
    height: 5rem;
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
