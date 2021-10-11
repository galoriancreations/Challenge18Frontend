<template>
  <div class="editor__introduction-field">
    <h3 for="introduction" class="editor__top-label">
      Introduction message
    </h3>
    <textarea-autosize
      v-if="isTemplateEditable"
      :value="value"
      @input="updateIntroduction"
      class="task-form__extra"
      placeholder="Message that would be displayed to the participants on the group chat, explaining about the day's subject"
      :min-height="100"
      :max-height="300"
    />
    <div v-else class="editor__introduction-text" ref="text">
      <div class="editor__introduction-text-wrapper">
        <p
          v-for="paragraph in introductionText"
          :key="paragraph"
          v-html="paragraph"
          v-linkified
        />
      </div>
    </div>
  </div>
</template>

<script>
import { convertTaskText, stripHTML } from "~/assets/util/functions";
import Scrollbar from "smooth-scrollbar";

export default {
  props: {
    value: String
  },
  inject: ["isTemplateEditable"],
  computed: {
    introductionText() {
      return convertTaskText(stripHTML(this.value))
        .split("\n")
        .filter(p => !!p.trim());
    }
  },
  methods: {
    updateIntroduction(value) {
      this.$emit("input", stripHTML(value));
    }
  },
  mounted() {
    if (!this.isTemplateEditable) {
      Scrollbar.init(this.$refs.text, { alwaysShowTracks: true });
    }
  }
};
</script>

<style lang="scss">
.editor {
  &__introduction-field {
    h3 {
      text-align: center;
    }

    textarea {
      border-radius: 0.5rem;
      padding: 1rem 1.25rem;
      max-width: 65rem;
      display: block;
      margin: auto;
      line-height: 1.6;
    }
  }

  &__introduction-text {
    max-width: 65rem;
    border: 0.2rem solid #ccc;
    border-radius: 0.8rem;
    margin: auto;
    margin-top: 2rem;
    max-height: 30rem;
  }

  &__introduction-text-wrapper {
    padding: 1.5rem 2rem;

    p {
      font-size: inherit;
      line-height: 1.7;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }

    strong {
      font-weight: 600;
    }
  }
}
</style>
