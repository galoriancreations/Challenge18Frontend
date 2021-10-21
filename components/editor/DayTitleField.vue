<template>
  <div class="editor__day-title">
    <h3 v-if="value || isTemplateEditable" class="challende-editor__top-label">
      {{ label }}
    </h3>
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      @keydown.native.enter.prevent
      :placeholder="placeholder"
      :rows="1"
      :readonly="!isTemplateEditable"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    label: String
  },
  inject: ["isTemplateEditable"],
  computed: {
    placeholder() {
      return this.isTemplateEditable ? "Enter day title" : this.label;
    }
  }
};
</script>

<style lang="scss">
.editor {
  &__day-title {
    margin-bottom: 4.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    @include respond(mobile) {
      margin-bottom: 3rem;
    }

    h3 {
      margin-bottom: 1.5rem;
      font-size: 2rem;
      color: $color-blue-2;
      font-weight: 600;

      @include respond(mobile) {
        font-size: 1.7rem;
      }
    }

    textarea {
      display: block;
      width: 100%;
      border: none;
      outline: none;
      text-align: center;
      font-family: "Spartan", sans-serif;
      font-size: 4.15rem;
      color: $color-blue-2;
      font-weight: 600;

      @include respond(mobile) {
        font-size: 2.9rem;
      }

      &:read-only::placeholder {
        color: $color-blue-2;
      }
    }
  }
}
</style>
