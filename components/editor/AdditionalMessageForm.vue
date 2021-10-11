<template>
  <div class="task-form additional-message-form">
    <div class="additional-message-form__top">
      <TaskTimeSelector />
      <div
        class="task-form__top-icons"
        v-if="deleteButton && isTemplateEditable"
      >
        <IconButton type="delete" @click="deleteMessage(messageIndex)" />
      </div>
    </div>
    <textarea-autosize
      v-if="isTemplateEditable"
      :value="message.content"
      @input="updateMessageContent"
      class="task-form__extra"
      placeholder="Type your message here..."
      :rows="2"
      :max-height="200"
    />
    <div v-else class="additional-message-form__text">
      <p
        v-for="paragraph in messageText"
        :key="paragraph"
        v-html="paragraph"
        v-linkified
      ></p>
    </div>
  </div>
</template>

<script>
import { convertTaskText, stripHTML } from "~/assets/util/functions";

export default {
  props: {
    message: Object,
    deleteButton: {
      type: Boolean,
      default: true
    }
  },
  inject: ["selectedDayMessages", "deleteMessage", "isTemplateEditable"],
  computed: {
    messageIndex() {
      return this.selectedDayMessages().indexOf(this.message);
    },
    messageText() {
      return convertTaskText(stripHTML(this.message.content)).split("\n");
    }
  },
  methods: {
    updateMessageContent(value) {
      this.message.content = stripHTML(value);
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
.additional-message-form {
  &__top {
    margin-bottom: 1.75rem;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .task-form__time-selector {
      margin: auto;

      @include respond(mobile) {
        &:not(:last-child) {
          margin: 0;
        }
      }
    }
  }

  .task-form__top-icons {
    grid-template-columns: 1fr;
  }

  textarea {
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
    line-height: 1.6;
  }

  &__text {
    p {
      font-size: inherit;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
