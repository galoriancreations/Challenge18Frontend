<template>
  <Page title="Chatbot With AI" name="chatbot" ref="page">
    <SectionHeading class="chatbot__heading">Chatbot</SectionHeading>
    <ChatBotCouncils
      @loading="setLoadingCouncil"
      :councils="councils"
      :activeCouncil="this.council || this.councils[0]"
    />
    <div class="chatbot__container">
      <div class="chatbot__container-threads-messages">
        <ChatBotThreads
          :activeThread="thread"
          @loading="setLoadingThread"
          @selectFirstThread="selectFirstThread"
        />
      </div>
      <ChatBotMessages
        :councils="councils"
        :loading="loading.messages || !thread"
        @sendMessage="sendMessage"
      />
    </div>
    <BaseSpinner
      v-if="loading.thread || loading.council"
      class="chatbot__loadingCircle"
    />
  </Page>
</template>

<script>
import councils from 'assets/data/councils.json';

export default {
  meta: {
    requiresAuth: true,
  },
  data() {
    return {
      loading: {
        thread: false,
        messages: false,
        council: false,
      },
      councils: councils.map((council) => ({
        ...council,
        image: require(`assets/images/chatbot/${council.image}`),
      })),
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
          assistant: this.council,
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
      const council = this.selectFirstCouncil();
      await this.$store.dispatch('chatbot/selectCouncil', council);
      if (!this.thread) {
        this.selectFirstThread();
      }
      setTimeout(() => {
        this.scrollToLastMessage();
      }, 100);
    },
    setLoadingThread(loading) {
      this.loading.thread = loading;
    },
    setLoadingCouncil(loading) {
      this.loading.council = loading;
    },
    async selectFirstThread() {
      const threadCookie = this.$cookies.get('selectedThread');
      if (
        threadCookie &&
        this.threads.find((thread) => thread.id === threadCookie.id)
      ) {
        this.$store.dispatch('chatbot/selectThread', {
          assistant: this.council,
          thread: threadCookie,
        });
        return threadCookie;
      }
      const thread = this.threads[0];
      if (!thread) {
        return await this.$store.dispatch('chatbot/createThread', this.council);
      }
      this.$cookies.set('selectedThread', thread);
      this.$store.dispatch('chatbot/selectThread', {
        assistant: this.council,
        thread,
      });
      return thread;
    },
    selectFirstCouncil() {
      const councilCookie = this.$cookies.get('selectedCouncil');
      if (councilCookie) {
        this.$store.dispatch('chatbot/selectCouncil', councilCookie);
        return councilCookie;
      }
      const council = this.councils[0];
      this.$store.dispatch('chatbot/selectCouncil', council);
      this.$cookies.set('selectedCouncil', council);
      return council;
    },
  },
  computed: {
    messages() {
      return this.$store.getters['chatbot/messages'];
    },
    threads() {
      return this.$store.getters['chatbot/threads'];
    },
    council() {
      return this.$store.getters['chatbot/council'];
    },
    thread() {
      return this.$store.getters['chatbot/thread'];
    },
  },
  async mounted() {
    if (!this.council) {
      await this.selectFirstCouncil();
    }
    await this.loadData();
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
    flex-direction: row;
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

  &__loadingCircle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
