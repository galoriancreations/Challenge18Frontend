<template>
  <EditorTopField v-if="value || isTemplateEditable" label="Challenge image">
    <ImageSelector
      :value="value"
      @input="$emit('input', $event)"
      :showUploader="isTemplateEditable"
      :loading="loading"
      @start-upload="onStartUpload"
      @end-upload="onFinishUpload"
    />
  </EditorTopField>
</template>

<script>
const ITEM_ID = "image";

export default {
  props: {
    value: null
  },
  inject: ["isTemplateEditable", "uploading"],
  computed: {
    loading() {
      return this.uploading.includes(ITEM_ID);
    }
  },
  methods: {
    onStartUpload() {
      this.uploading.push(ITEM_ID);
    },
    onFinishUpload() {
      this.uploading.splice(this.uploading.indexOf(ITEM_ID), 1);
    }
  }
};
</script>
