<template>
  <Page title="Chat Bot With AI" name="chatbot" ref="page">
    <SectionHeading class="chatbot__heading">
      <h3>Chat Bot With AI</h3>
    </SectionHeading>
    <h2>
      This is a chat bot with AI that can answer questions
    </h2>
    <SectionSeperator />
    <div class="chatbot__container">
      <div class="chatbot__messages" ref="messages" @scroll="handleScroll">
        <ChatBotMessage
          :message="message"
          v-for="(message, id) in messages"
          :key="id"
        />
        <div
          class="chatbot__scrolldown"
          :style="{ visibility: showScrollDown ? 'visible' : 'hidden' }"
          @click="scrollToLastMessage()"
        >
          <i class="fas fa-arrow-down" />
        </div>
        <LoadingDots :loading="loading" />
      </div>
      <ChatBotInput @sendMessage="sendMessage" :loading="loading" />
    </div>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      showScrollDown: false,
    };
  },
  methods: {
    async sendMessage(message) {
      if (message.length > 1) {
        this.loading = true;
        await this.$store.dispatch('chatbot/addMessage', {
          role: 'user',
          text: message,
        });
        this.scrollToLastMessage();
        await this.$store.dispatch('chatbot/sendMessage', message);
        this.scrollToLastMessage();
        this.loading = false;
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
    handleScroll() {
      const messagesContainer = this.$refs.messages;
      const isAtBottom =
        messagesContainer.scrollTop + messagesContainer.clientHeight >=
        messagesContainer.scrollHeight - 60;

      this.showScrollDown = !isAtBottom;
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

  &__heading {
    margin-bottom: 4rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    overflow: auto;
    box-shadow: $boxshadow2;
    padding: 0.5rem;

    @include respond(mobile) {
      padding: 0;
    }
  }

  &__messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: #f5f5f5;
    border-radius: 0.5rem;
    overflow-y: auto;
    margin-bottom: 2rem;
    scroll-behavior: smooth;

    &:last-child {
      margin-bottom: 0 !important;
    }

    @include respond(mobile) {
      padding: 1rem;
    }
  }

  &__scrolldown {
    position: absolute;
    display: inline;
    font-size: 2rem;
    color: #4c9cd4;
    cursor: pointer;
    transition: all 0.2s;
    margin: 0 auto;

    bottom: 22rem;
    left: 50%;
    transform: translateX(-50%);

    border-radius: 100%;
    padding: 1.5rem 2rem;
    background-color: #fff;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      transform: translateX(-50%) scale(1.1);
    }
  }
}
</style>
