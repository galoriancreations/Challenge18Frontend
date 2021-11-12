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
      :readonly="!isTemplateEditable"
      :maxlength="21"
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
          ? "Enter challenge name here"
          : "Type name here"
        : null;
    }
  },
  mounted() {
    console.log(this.value.length);
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
    border: none;
    outline: none;
    text-align: center;

    @include respond(mobile) {
      font-size: 3rem;
    }
  }
}
</style>
