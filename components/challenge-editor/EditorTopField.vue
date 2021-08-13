<template>
  <div class="challenge-editor__top-field">
    <h3 class="challenge-editor__top-label">
      {{ label }}
    </h3>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    label: String
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__top-field {
    display: flex;
    flex-direction: column;
    text-align: center;

    &:not(:last-child) {
      margin-bottom: 4rem;

      @include respond(mobile) {
        margin-bottom: 3.5rem;
      }
    }

    input {
      text-align: center;
      border: none;
      outline: none;
    }
  }

  &__top-label {
    font-weight: 500;
    font-size: 1.85rem;
    margin-bottom: 1.2rem;

    @include respond(mobile) {
      font-size: 1.65rem;
    }
  }
}
</style>
