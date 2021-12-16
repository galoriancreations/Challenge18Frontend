<template>
  <EditorTopField label="Challenge name">
    <textarea-autosize
      :value="value"
      @input="$emit('input', $event)"
      @keydown.native.enter.prevent
      class="editor__name"
      :style="{ direction }"
      :placeholder="placeholder"
      :rows="1"
      :maxlength="21"
      :readonly="!isTemplateEditable"
    />
  </EditorTopField>
</template>

<script>
import { rtlLanguages } from "~/assets/util/options";

export default {
  props: {
    value: String
  },
  inject: ["data", "isTemplateEditable"],
  computed: {
    direction() {
      return rtlLanguages.includes(this.data.language) ? "rtl" : null;
    },
    placeholder() {
      return process.client
        ? window.innerWidth > 600
          ? "Enter challenge name"
          : "Type name here"
        : null;
    }
  }
};
</script>

<style lang="scss">
.editor {
  &__name {
    font: inherit;
    font-size: 5rem;
    font-family: "Spartan", sans-serif;
    letter-spacing: -0.5px;
    font-weight: 600;
    color: $color-blue-2;
    border: 0.2rem solid #ccc;
    border-radius: 0.5rem;
    outline: none;
    text-align: center;
    padding: 1.5rem 1rem;
    transition: border-color 0.5s;
    width: 100%;
    max-width: 65rem;
    margin: auto;

    @include respond(mobile) {
      font-size: 3rem;
      padding: 1.25rem 1rem;
    }

    &:focus {
      border-color: $color-azure;
    }

    &:read-only {
      border: none;
      padding: 0;
      max-width: initial;
    }
  }
}
</style>
