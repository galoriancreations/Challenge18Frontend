<template>
  <EditorTopField label="Challenge name">
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      class="challenge-editor__name"
      :placeholder="placeholder"
      :rows="1"
    />
  </EditorTopField>
</template>

<script>
import EditorTopField from "./EditorTopField";

export default {
  components: { EditorTopField },
  props: {
    value: String
  },
  computed: {
    placeholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Enter challenge name here"
          : "Type name here"
        : null;
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  &__name {
    font: inherit;
    font-size: 5rem;
    font-family: "Spartan", sans-serif;
    letter-spacing: -0.5px;
    font-weight: 600;
    color: $color-blue-2;
    border: none;
    outline: none;
    text-align: center;

    @include respond(mobile) {
      font-size: 3rem;
    }
  }
}
</style>
