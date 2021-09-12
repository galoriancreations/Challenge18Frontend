<template>
  <TransitionGroup class="challenge-editor__day-messages" :name="transition">
    <AdditionalMessageForm
      v-for="message in messages"
      :key="message.id"
      :message="message"
    />
    <div key="add" class="challenge-editor__add-message">
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
  inject: ["getTransition", "setTransition", "setConfirmModal"],
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
      this.setTransition("task-delete");
      this.messages.splice(messageIndex, 1);
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
