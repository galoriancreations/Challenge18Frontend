<template>
  <Page title="Chatbot With AI" name="chatbot" ref="page">
    <SectionHeading class="chatbot__heading">Chatbot</SectionHeading>
    <ChatBotCouncils
      @loading="setLoadingCouncil"
      :councils="councils"
      :activeCouncil="activeCouncil"
    />
    <div class="chatbot__container">
      <ChatBotThreads
        :activeThread="thread"
        @loading="setLoadingThread"
        @selectFirstThread="selectFirstThread"
        :activeCouncil="activeCouncil"
      />
      <ChatBotMessages
        :councils="councils"
        :activeCouncil="activeCouncil"
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
        await this.$store.dispatch('chatbot/sendMessage', {
          text: message,
          assistant: this.council,
          thread: this.thread,
        });
        this.loading.messages = false;
      }
    },
    async loadData() {
      const council = this.selectFirstCouncil();
      await this.$store.dispatch('chatbot/selectCouncil', council);
      if (!this.thread) {
        this.selectFirstThread();
      }
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
    councils() {
      return this.$store.getters['chatbot/councils'];
    },
    council() {
      return this.$store.getters['chatbot/council'];
    },
    threads() {
      return this.$store.getters['chatbot/threads'];
    },
    thread() {
      return this.$store.getters['chatbot/thread'];
    },
    activeCouncil() {
      return (
        this.councils.find((council) => council.id === this.council?.id) ||
        this.selectFirstCouncil()
      );
    },
  },
  mounted() {
    this.loadData();
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
  }

  &__loadingCircle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
