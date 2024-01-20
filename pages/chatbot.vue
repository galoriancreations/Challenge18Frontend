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
      <div class="chatbot__container-threads-messages">
        <ChatBotThreads
          :threads="threads"
          :activeThread="thread"
          @loading="setLoadingThread"
          @selectFirstThread="selectFirstThread"
        />
        <div class="chatbot__messages">
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
            <ChatBotNoMessages v-else />
          </div>
          <div class="chatbot__messages-input">
            <ChatBotInput
              @sendMessage="sendMessage"
              :loading="loading.messages || !thread"
            />
            <div class="chatbot__loading-dots">
              <LoadingDots v-if="loading.messages" />
            </div>
            <div
              class="chatbot__loading-scrolldown"
              v-if="showScrollDown"
              @click="scrollToLastMessage()"
            >
              <ScrollDownButton />
            </div>
          </div>
        </div>
      </div>
    </div>
    <BaseSpinner v-if="loading.thread" class="chatbot__loadingCircle" />
  </Page>
</template>

<script>
export default {
  meta: {
    requiresAuth: true,
  },
  data() {
    return {
      loading: {
        thread: false,
        messages: false,
      },
      showScrollDown: false,
    };
  },
  methods: {
    async sendMessage(message) {
      if (message.trim().length > 1 && !this.loading.messages) {
        this.loading.messages = true;
        await this.$store.dispatch('chatbot/addMessage', {
          role: 'user',
          text: message,
          createdAt: Math.floor(Date.now() / 1000),
        });
        this.scrollToLastMessage();
        await this.$store.dispatch('chatbot/sendMessage', {
          text: message,
          thread: this.thread,
        });
        this.loading.messages = false;
        this.scrollToLastMessage();
      }
    },
    scrollToLastMessage() {
      const messagesContainer = this.$refs.messages;
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    },
    async loadData() {
      await this.$store.dispatch('chatbot/loadThreads');
      if (this.thread) {
        await this.$store.dispatch('chatbot/loadMessages', this.thread);
      }
      setTimeout(() => {
        this.scrollToLastMessage();
      }, 100);
    },
    handleScrollDown() {
      const messagesContainer = this.$refs.messages;
      this.showScrollDown = messagesContainer.scrollTop <= -10;
    },
    setLoadingMessages(loading) {
      this.loading.messages = loading;
    },
    setLoadingThread(loading) {
      this.loading.thread = loading;
    },
    selectFirstThread() {
      const threadCookie = this.$cookies.get('selectedThread');
      if (threadCookie) {
        this.$store.dispatch('chatbot/selectThread', threadCookie);
        return threadCookie;
      }
      const thread = this.threads[0];
      this.$store.dispatch('chatbot/selectThread', thread);
      this.$cookies.set('selectedThread', thread);
      return thread;
    },
  },
  computed: {
    messages() {
      return this.$store.getters['chatbot/messages'];
    },
    threads() {
      return this.$store.getters['chatbot/threads'];
    },
    thread() {
      return this.$store.getters['chatbot/thread'] || this.selectFirstThread();
    },
  },
  mounted() {
    this.loadData();
  },
  watch: {
    messages() {
      this.scrollToLastMessage();
    },
    thread() {
      this.$refs.page.$el.querySelector('.chatbot-input__textarea').value = '';
    },
  },
};
</script>

<style lang="scss">
.chatbot {
  position: relative;

  &__container {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 80vh;
    width: 100%;
    box-shadow: $boxshadow2;

    @include respond(mobile) {
      padding: 0;
    }

    &-threads-messages {
      display: flex;
      flex-direction: row;
      height: 100%;
    }
  }

  &__messages {
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
  }

  &__loading-dots {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0.5rem;
  }

  &__loading-scrolldown {
    // place it on the right side of the messages container
    position: absolute;
    right: 8rem;
    bottom: 12rem;

    @include respond(mobile) {
      right: 6rem;
      bottom: 10rem;
    }
  }

  &__loadingCircle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
