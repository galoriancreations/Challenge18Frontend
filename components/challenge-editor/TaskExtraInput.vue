<template>
  <form>
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      class="task-form__extra"
      :placeholder="placeholder"
      :rows="1"
    />
  </form>
</template>

<script>
export default {
  props: {
    value: String
  },
  computed: {
    placeholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Type and press Enter to add a new option..."
          : "Enter new option here..."
        : null;
    }
  }
};
</script>

<style lang="scss">
.task-form {
  &__extra {
    font: inherit;
    outline: none;
    width: 100%;
    padding: 1rem 2rem;
    border: 0.2rem solid #ccc;
    border-radius: 100px;
    margin-top: 1rem;
    transition: all 0.5s;

    @include respond(tablet-sm) {
      margin-top: 0.5rem;
    }

    &:focus {
      border-color: $color-azure;
    }
  }
}
</style>
