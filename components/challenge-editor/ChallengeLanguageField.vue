<template>
  <EditorTopField label="Challenge language">
    <v-select
      :value="value"
      @input="$emit('input', $event)"
      :options="languageOptions"
      :reduce="option => option.name"
      class="language-selector"
    />
  </EditorTopField>
</template>

<script>
import languageOptions from "../../assets/data/languages";

export default {
  props: {
    value: String
  },
  data() {
    return { languageOptions };
  }
};
</script>

<style lang="scss">
.challenge-editor {
  .language-selector {
    font-weight: 600;
    font-size: 2.2rem;
    height: 4.2rem;

    @include respond(mobile) {
      font-size: 1.9rem;
      height: 3.8rem;
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
