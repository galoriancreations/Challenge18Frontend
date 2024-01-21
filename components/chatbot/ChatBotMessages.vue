<template>
  <section class="chatbot__messages">
    <div
      class="chatbot__messages-content"
      ref="messages"
      @scroll="handleScrollDown"
    >
      <div v-if="thread && messages.length">
        <ChatBotMessage
          :message="message"
          v-for="message in messages"
          :key="message.id"
        />
      </div>
      <ChatBotNoMessages
        v-else
        :councils="councils"
        @sendMessage="sendMessage"
      />
    </div>
    <div class="chatbot__messages-input">
      <ChatBotInput @sendMessage="sendMessage" :loading="loading || !thread" />
      <div class="chatbot__loading-dots">
        <LoadingDots v-if="loading" />
      </div>
      <div
        class="chatbot__loading-scrolldown"
        v-if="showScrollDown"
        @click="scrollToLastMessage"
      >
        <ScrollDownButton />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showScrollDown: false,
    };
  },
  props: {
    councils: [],
    loading: false,
  },
  emits: ['sendMessage', 'scrollToLastMessage'],
  methods: {
    handleScrollDown() {
      const messagesContainer = this.$refs.messages;
      this.showScrollDown = messagesContainer.scrollTop <= -10;
    },
    sendMessage(message) {
      this.$emit('sendMessage', message);
    },
  },
  computed: {
    messages() {
      return this.$store.getters['chatbot/messages'];
    },
    thread() {
      return this.$store.getters['chatbot/thread'];
    },
  },
};
</script>

<style lang="scss">
.chatbot__messages {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  &-content {
    flex: 1;
    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 0.5rem;
    overflow-y: auto;
    scroll-behavior: smooth;

    @include respond(mobile) {
      padding: 1rem;
    }
  }

  &-input {
    border-left: 1px solid #eee;
  }

  &__loading-dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.5rem;
  }

  &__loading-scrolldown {
    position: absolute;
    right: 8rem;
    bottom: 12rem;

    @include respond(mobile) {
      right: 6rem;
      bottom: 10rem;
    }
  }
}
</style>
