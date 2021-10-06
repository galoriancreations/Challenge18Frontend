<template>
  <EditorTopField label="Allow making copies">
    <div class="challenge-editor__visibility-options">
      <div
        v-for="option in options"
        :key="option.id"
        class="challenge-editor__visibility-option"
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
        <label :for="option.id" class="challenge-editor__visibility-label">
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
        { value: true, id: "option-yes", label: "Yes" },
        { value: false, id: "option-no", label: "No" }
      ]
    };
  }
};
</script>
