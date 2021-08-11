<template>
  <span class="header__nav-toggle" @click="toggleNav">
    <span /><span /><span />
  </span>
</template>

<script>
export default {
  inject: ["toggleNav"]
};
</script>

<style lang="scss">
.header {
  &__nav-toggle {
    display: none;
  }
  @include respond(tablet) {
    &__nav-toggle {
      display: block;
      height: 2rem;
      width: 2.4rem;
      position: relative;
      span {
        display: block;
        position: absolute;
        height: 0.3rem;
        width: 2.4rem;
        background-color: #fff;
        border-radius: 100px;
        transition: all 0.5s;
        &:nth-child(1) {
          top: 0;
        }
        &:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.6s;
        }
        &:nth-child(3) {
          bottom: 0;
        }
      }
    }
    &.active &__nav-toggle span {
      &:nth-child(1) {
        top: 50%;
        transform: translateY(-50%) rotate(135deg);
      }
      &:nth-child(2) {
        transform: translate(20rem, -50%);
      }
      &:nth-child(3) {
        bottom: 50%;
        transform: translateY(50%) rotate(-135deg);
      }
    }
  }

  &.sticky:not(.active) &__nav-toggle span {
    background-color: #000;
  }
}
</style>
