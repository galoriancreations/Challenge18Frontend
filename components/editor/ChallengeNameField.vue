<template>
  <EditorTopField label="Challenge name">
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      @keydown.native.enter.prevent
      class="editor__name"
      :placeholder="placeholder"
      :rows="1"
      :readonly="!isTemplateEditable"
    />
  </EditorTopField>
</template>

<script>
export default {
  props: {
    value: String
  },
  inject: ["isTemplateEditable"],
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
.editor {
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
