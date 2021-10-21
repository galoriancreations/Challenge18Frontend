<template>
  <EditorTopField v-if="value || isTemplateEditable" label="Challenge image">
    <ImageSelector
      :value="value"
      @input="$emit('input', $event)"
      :showImgElement="value && (!isTemplateEditable || !hasSelectedImage)"
      :showInput="isTemplateEditable"
    />
  </EditorTopField>
</template>

<script>
export default {
  props: {
    value: [String, Object]
  },
  inject: ["isTemplateEditable"],
  computed: {
    hasSelectedImage() {
      return !!this.value && typeof this.value === "object";
    }
  }
};
</script>
