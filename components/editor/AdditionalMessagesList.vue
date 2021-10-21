<template>
  <TransitionGroup tag="div" class="editor__day-messages" :name="transition">
    <MessageForm
      v-for="(message, index) in messages"
      :key="message.id"
      :message="message"
      @delete="deleteMessage(index)"
    />
    <div v-if="isTemplateEditable" key="add" class="editor__add-message">
      <ActionButton type="add" color="white" @click="$emit('add-click')" />
    </div>
  </TransitionGroup>
</template>

<script>
export default {
  props: {
    messages: Array
  },
  inject: [
    "getTransition",
    "setTransition",
    "setConfirmModal",
    "isTemplateEditable"
  ],
  computed: {
    transition() {
      return this.getTransition();
    }
  },
  methods: {
    deleteMessage(messageIndex) {
      const message = this.messages[messageIndex];
      this.setConfirmModal(
        "Are you sure you want to delete this message? This action is irreversible.",
        () => {
          this.setTransition("task-delete");
          this.messages.splice(messageIndex, 1);
        },
        !message.content.trim() && !message.file
      );
    }
  }
};
</script>
