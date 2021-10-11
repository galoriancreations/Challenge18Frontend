<template>
  <EditorTopField label="Template availability">
    <div class="editor__visibility-options">
      <div
        v-for="option in options"
        :key="option.id"
        class="editor__visibility-option"
      >
        <input
          type="radio"
          class="radio-input"
          :id="option.id"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('change', option.value)"
        />
        <label :for="option.id" class="radio-label">
          <span class="radio-button" />
        </label>
        <label :for="option.id" class="editor__visibility-label">
          {{ option.label }}
        </label>
      </div>
    </div>
  </EditorTopField>
</template>

<script>
export default {
  model: {
    prop: "modelValue",
    event: "change"
  },
  props: {
    modelValue: Boolean
  },
  data() {
    return {
      options: [
        { value: true, id: "option-public", label: "Public" },
        { value: false, id: "option-private", label: "Private" }
      ]
    };
  }
};
</script>

<style lang="scss">
.editor {
  &__visibility-options {
    margin: auto;
    display: grid;
    grid-template-columns: repeat(2, min-content);
    gap: 7rem;
  }

  &__visibility-option {
    display: grid;
    grid-template-columns: repeat(2, min-content);
    align-items: center;
    gap: 0.8rem;
  }

  &__visibility-label {
    font-size: 1.7rem;
    cursor: pointer;

    @include respond(mobile) {
      font-size: 1.55rem;
    }
  }
}
</style>
