<template>
  <div class="task-form pre-message-form">
    <TaskTimeSelector />
    <textarea-autosize
      v-if="isTemplateEditable"
      :value="message.text"
      @input="updateMessageText"
      class="task-form__extra"
      placeholder="Type your message here..."
      :rows="2"
      :max-height="200"
    />
    <div v-else class="pre-message-form__text" ref="text">
      <div class="pre-message-form__text-wrapper">
        <p
          v-for="paragraph in messageText"
          :key="paragraph"
          v-html="paragraph"
          v-linkified
        />
      </div>
    </div>
  </div>
</template>

<script>
import Scrollbar from "smooth-scrollbar";
import { convertTaskText, stripHTML } from "~/assets/util/functions";

export default {
  props: {
    message: Object
  },
  inject: ["isTemplateEditable"],
  computed: {
    messageText() {
      return convertTaskText(stripHTML(this.message.text))
        .split("\n")
        .filter(p => !!p.trim());
    }
  },
  methods: {
    updateMessageText(value) {
      this.message.text = stripHTML(value);
    }
  },
  mounted() {
    if (!this.isTemplateEditable) {
      Scrollbar.init(this.$refs.text, { alwaysShowTracks: true });
    }
  },
  provide() {
    return {
      task: this.message
    };
  }
};
</script>

<style lang="scss">
.pre-message-form {
  &__title {
    color: $color-blue-2;
    font-size: 1.95rem;
    margin-right: 2rem;

    @include respond(mobile) {
      font-size: 1.75rem;
    }

    &:last-child {
      margin: auto;
    }
  }

  .task-form__time-selector {
    margin-bottom: 2rem;
  }

  textarea {
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    line-height: 1.6;
  }

  &__text {
    border: 0.2rem solid #ccc;
    border-radius: 0.8rem;
    max-height: 30rem;
  }

  &__text-wrapper {
    padding: 1.5rem 2rem;

    p {
      font-size: inherit;
      line-height: 1.7;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
