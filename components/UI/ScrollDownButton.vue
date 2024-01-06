<template>
  <div class="scrolldown">
    <i class="fas fa-arrow-down" />
  </div>
</template>

<style lang="scss">
.scrolldown {
  position: absolute;
  display: inline;
  font-size: 2rem;
  color: #4c9fffa7;
  cursor: pointer;
  transition: all 0.2s;
  margin: 0 auto;
  bottom: 22rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 100%;
  padding: 1rem 1.5rem;
  background-color: #ffffffa7;
  box-shadow: 0 0.5rem rgba(255, 255, 255, 0.159) rem rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    transform: translateX(-50%) scale(1.1);
  }

  @include respond(mobile) {
    bottom: 20rem;
  }
}
</style>
