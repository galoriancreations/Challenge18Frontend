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
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
  </Page>
</template>

<script>
import confirmModal from '~/mixins/confirm-modal';

export default {
  meta: {
    requiresAuth: true,
  },
  mixins: [confirmModal],
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
      if (message.length && !this.loading.messages) {
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
      await this.selectFirstCouncil();
      if (!this.thread) {
        await this.selectFirstThread();
      }
    },
    setLoadingThread(loading) {
      this.loading.thread = loading;
    },
    setLoadingCouncil(loading) {
      this.loading.council = loading;
    },
    async selectFirstThread() {
      this.loading.thread = true;
      let thread = this.$cookies.get('selectedThread');
      if (!thread || !this.threads.find((t) => t.id === thread.id)) {
        thread =
          this.threads[0] ||
          (await this.$store.dispatch('chatbot/createThread', this.council));
        this.$cookies.set('selectedThread', thread);
      }
      await this.$store.dispatch('chatbot/selectThread', {
        assistant: this.council,
        thread,
      });
      this.loading.thread = false;
      return thread;
    },
    async selectFirstCouncil() {
      let council = this.$cookies.get('selectedCouncil');
      if (!council) {
        council = this.councils[0];
        this.$cookies.set('selectedCouncil', council);
      }
      await this.$store.dispatch('chatbot/selectCouncil', council);
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
        this.councils.find((council) => council.id === this.council?.id) || {}
      );
    },
  },
  mounted() {
    this.loadData();
    if (!this.$store.getters.user.email && !this.$store.getters.user.image) {
      this.$store.dispatch('updateUser');
    }
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
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
  }
}
</style>
