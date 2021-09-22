<template>
  <TransitionGroup class="challenge-editor__day-messages" :name="transition">
    <AdditionalMessageForm
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
    <div
      v-if="isTemplateEditable"
      key="add"
      class="challenge-editor__add-message"
    >
      <ActionButton type="add" color="white" @click="addMessage" />
    </div>
  </TransitionGroup>
</template>

<script>
import { newMessage } from "~/assets/util/functions";

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
    addMessage() {
      this.setTransition("task");
      this.messages.push(newMessage());
    },
    deleteMessage(messageIndex) {
      this.setConfirmModal(
        "Are you sure you want to delete this message? This action is irreversible.",
        () => {
          this.setTransition("task-delete");
          this.messages.splice(messageIndex, 1);
        },
        !this.messages[messageIndex].content.trim()
      );
    }
  },
  provide() {
    return {
      selectedDayMessages: () => this.messages,
      deleteMessage: this.deleteMessage
    };
  }
};
</script>
