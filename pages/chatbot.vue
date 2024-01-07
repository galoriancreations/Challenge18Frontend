<template>
  <Page title="Chat Bot With AI" name="chatbot" ref="page">
    <SectionHeading class="chatbot__heading">
      <h3>Chat Bot With AI</h3>
    </SectionHeading>
    <h3>
      This is a chat bot with AI that can answer questions
    </h3>
    <SectionSeperator />
    <div class="chatbot__container">
      <div class="chatbot__messages" ref="messages" @scroll="handleScrollDown">
        <div v-if="messages.length">
          <ChatBotMessage
            :message="message"
            v-for="message in messages"
            :key="message.id"
          />
        </div>
        <div v-else>
          <ChatBotPlaceHolder />
        </div>
      </div>
      <div v-if="showScrollDown" @click="scrollToLastMessage()">
        <ScrollDownButton />
      </div>
      <LoadingDots v-if="loading" />
      <ChatBotInput @sendMessage="sendMessage" :loading="loading" />
    </div>
  </Page>
</template>

<script>
export default {
  meta: {
    requiresAuth: true,
  },
  data() {
    return {
      loading: false,
      showScrollDown: false,
    };
  },
  methods: {
    async sendMessage(message) {
      if (message.trim().length > 1 && !this.loading) {
        this.loading = true;
        await this.$store.dispatch('chatbot/addMessage', {
          role: 'user',
          text: message,
          createdAt: Math.floor(Date.now() / 1000),
        });
        this.scrollToLastMessage();
        await this.$store.dispatch('chatbot/sendMessage', message);
        this.loading = false;
        this.scrollToLastMessage();
      }
    },
    scrollToLastMessage() {
      const messagesContainer = this.$refs.messages;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },
    async loadMessages() {
      await this.$store.dispatch('chatbot/loadMessages');
      setTimeout(() => {
        this.scrollToLastMessage();
      }, 100);
    },
    handleScrollDown() {
      const messagesContainer = this.$refs.messages;
      this.showScrollDown = messagesContainer.scrollTop <= -10;
    },
  },
  computed: {
    messages() {
      return this.$store.getters['chatbot/messages'];
    },
  },
  mounted() {
    this.loadMessages();
  },
  watch: {
    messages() {
      this.scrollToLastMessage();
    },
  },
};
</script>

<style lang="scss">
.chatbot {
  position: relative;

  &__container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    overflow: auto;
    box-shadow: $boxshadow2;

    @include respond(mobile) {
      padding: 0;
    }
  }

  &__messages {
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
}
</style>
