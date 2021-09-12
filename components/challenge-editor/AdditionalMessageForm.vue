<template>
  <div class="task-form additional-message-form">
    <div class="additional-message-form__top">
      <TaskTimeSelector />
      <div class="task-form__top-icons" v-if="deleteButton">
        <IconButton type="delete" @click="deleteMessage(messageIndex)" />
      </div>
    </div>
    <textarea-autosize
      v-model="message.content"
      class="task-form__extra"
      placeholder="Type your message here..."
      :rows="2"
      :max-height="100"
    />
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
    deleteButton: {
      type: Boolean,
      default: true
    }
  },
  inject: ["selectedDayMessages", "deleteMessage"],
  computed: {
    messageIndex() {
      return this.selectedDayMessages().indexOf(this.message);
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

  textarea {
    border-radius: 0.5rem;
    padding: 1rem 1.25rem;
  }
}
</style>
