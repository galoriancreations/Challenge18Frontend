<template>
  <EditorTopField label="Challenge language">
    <VueSelect
      v-if="isTemplateEditable"
      :value="value"
      @input="$emit('input', $event)"
      :options="languageOptions"
      :reduce="option => option.name"
      class="language-selector"
    />
    <span v-else class="language-selector">
      {{ languageText }}
    </span>
  </EditorTopField>
</template>

<script>
import languageOptions from "../../assets/data/languages";

export default {
  props: {
    value: String
  },
  inject: ["isTemplateEditable"],
  data() {
    return { languageOptions };
  },
  computed: {
    languageText() {
      return languageOptions.find(language => language.name === this.value)
        ?.label;
    }
  }
};
</script>

<style lang="scss">
.challenge-editor {
  .language-selector {
    font-weight: 600;
    font-size: 2.2rem;

    @include respond(mobile) {
      font-size: 1.9rem;
    }

    &:not(span) {
      height: 4.2rem;

      @include respond(mobile) {
        height: 3.8rem;
      }
    }

    .vs__clear {
      display: none;
    }

    ul {
      * {
        font-size: 1.6rem;

        @include respond(mobile) {
          font-size: 1.45rem;
        }
      }
    }
  }
}
</style>
