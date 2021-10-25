<template>
  <div class="editor__day-image-field">
    <h3 for="introduction" class="editor__top-label">
      Day image
    </h3>
    <ImageSelector
      :value="value"
      @input="$emit('input', $event)"
      :id="dayData.id"
      :loading="loading"
      @start-upload="onStartUpload"
      @end-upload="onEndUpload"
      :error.sync="dayData.error"
      :hasSelectedImage.sync="dayData.hasSelectedImage"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: null
  },
  inject: ["getDayData", "uploading"],
  computed: {
    dayData() {
      return this.getDayData();
    },
    loading() {
      return this.uploading.includes(this.dayData.id);
    }
  },
  methods: {
    onStartUpload() {
      this.uploading.push(this.dayData.id);
    },
    onEndUpload() {
      this.uploading.splice(this.uploading.indexOf(this.dayData.id), 1);
    }
  }
};
</script>

<style lang="scss">
.editor {
  &__day-image-field {
    h3 {
      text-align: center;
    }
  }
}
</style>
