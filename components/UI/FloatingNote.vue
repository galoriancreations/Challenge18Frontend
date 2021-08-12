<template>
  <div class="floating-note">
    <slot />
  </div>
</template>

<style lang="scss">
.floating-note {
  box-shadow: $boxshadow2;
  border-radius: 0.8rem;
  padding: 1.5rem 2rem;
  background-color: #fff;
  font-size: 1.5rem;
  line-height: 1.6;

  @include respond(mobile) {
    font-size: 1.35rem;
    text-align: center;
  }

  &:not(:last-child) {
    margin-bottom: 1.5rem;

    @include respond(mobile) {
      margin-bottom: 1rem;
    }
  }

  & > p {
    font-size: inherit;

    &:not(:last-child) {
      margin-bottom: 1.5rem;

      @include respond(mobile) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
