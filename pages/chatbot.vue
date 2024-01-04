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
      <div class="chatbot__messages" ref="messages">
        <Message :message="message" v-for="message in messages" />
      </div>
      <InputWithSend @sendMessage="sendMessage" :loading="loading" />
    </div>
  </Page>
</template>

<script>
import placeholder from '../placeholder_chatbot-messages.json';

export default {
  data() {
    return {
      message: '',
      loading: false,
    };
  },
  methods: {
    async sendMessage(message) {
      if (message.length > 1) {
        // this.loading = true;
        const result = await this.$store.dispatch('chatbot/sendMessage', message);
        console.log({ result });
        this.scrollToLastMessage();
      }
    },
    scrollToLastMessage() {
      const messagesContainer = this.$refs.messages;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },
  },
  computed: {
    messages() {
      return placeholder;
      // return this.$store.getters["chatbot/messages"];
    },
  },
  mounted() {
    window.onload = () => this.scrollToLastMessage();
  },
};
</script>

<style lang="scss">
.chatbot {
  &__heading {
    margin-bottom: 4rem;
  }

  &__container {
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 100%;
    margin: 0 auto;
    padding: 0 2rem;
    overflow: auto;
    box-shadow: $boxshadow2;
    padding: 0.5rem;

    @include respond(mobile) {
      padding: 0 1rem;
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
      margin-bottom: 0;
    }

    @include respond(mobile) {
      padding: 1rem;
    }
  }
}
</style>
