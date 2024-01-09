<template>
  <div class="scrolldown">
    <i class="fas fa-arrow-down" />
  </div>
</template>

<style lang="scss">
.scrolldown {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  color: #4c9fffa7;
  transition: all 0.2s;
  border-radius: 50%;
  background-color: #ffffffa7;
  box-shadow: 0 0.5rem rgba(255, 255, 255, 0.159) rem rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.1);
  }

  @include respond(mobile) {
    width: 3rem;
    height: 3rem;
  }
}
</style>
