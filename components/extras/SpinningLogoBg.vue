<template>
  <div class="logo-bg">
    <img src="../../assets/images/new-logo.png" alt="Challenge 18" />
  </div>
</template>

<style lang="scss">
.logo-bg {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  img {
    height: 16rem;
    opacity: 0.4;
    animation: spin 2s infinite linear;

    @include respond(mobile) {
      height: auto;
      width: 20rem;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
