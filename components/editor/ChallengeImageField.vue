<template>
  <EditorTopField v-if="value || isTemplateEditable" label="Challenge image">
    <textarea-autosize
      class="editor__img-input"
      :value="value"
      @input="$emit('input', $event)"
      :disabled="!isTemplateEditable"
      placeholder="Enter image URL here..."
      :rows="1"
    />
  </EditorTopField>
</template>

<script>
export default {
  props: {
    value: String
  },
  inject: ["isTemplateEditable"]
};
</script>

<style lang="scss">
.editor__img-input {
  font: inherit;
  outline: none;
  display: block;
  width: 100%;
  max-width: 100rem;
  margin: auto;
  text-align: center;
}
</style>
