<template>
  <div class="loading-dots">
    <div class="loading-dots__dot" />
    <div class="loading-dots__dot" />
    <div class="loading-dots__dot" />
  </div>
</template>

<style lang="scss">
.loading-dots {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 16rem;
  left: 50%;
  transform: translateX(-50%);

  &__dot {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background-color: #4c9cd4;
    margin: 0 0.5rem;
    animation: loading-dots 1s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.1s;
    }

    &:nth-child(3) {
      animation-delay: 0.2s;
    }
  }

  @keyframes loading-dots {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-0.5rem);
    }

    100% {
      transform: translateY(0);
    }
  }
}
</style>
