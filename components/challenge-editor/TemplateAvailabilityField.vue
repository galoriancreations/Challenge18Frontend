<template>
  <EditorTopField label="Template availability">
    <div class="challenge-editor__visibility-options">
      <div class="challenge-editor__visibility-option">
        <input
          type="radio"
          v-model="selection"
          :value="true"
          class="radio-input"
          id="option-public"
        />
        <label for="option-public" class="radio-label">
          <span class="radio-button" />
        </label>
        <label for="option-public" class="challenge-editor__visibility-label">
          Public
        </label>
      </div>
      <div class="challenge-editor__visibility-option">
        <input
          type="radio"
          v-model="selection"
          :value="false"
          class="radio-input"
          id="option-private"
        />
        <label for="option-private" class="radio-label">
          <span class="radio-button" />
        </label>
        <label for="option-private" class="challenge-editor__visibility-label">
          Private
        </label>
      </div>
    </div>
  </EditorTopField>
</template>

<script>
import EditorTopField from "./EditorTopField";

export default {
  components: { EditorTopField },
  props: {
    value: Boolean
  },
  data() {
    return {
      selection: this.value
    };
  },
  watch: {
    selection(value) {
      this.$emit("input", value);
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
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
