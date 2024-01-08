<template>
  <div class="chatbot-threads" v-if="show">
    <div class="chatbot-threads__header">
      <div class="chatbot-threads__header-title">ChatBots</div>
      <div class="chatbot-threads__header-close" @click="show = !show">X</div>
    </div>
    <div class="chatbot-threads__content">
      <div class="chatbot-threads__content-thread">
        <ChatBotThread
          :thread="thread"
          v-for="thread in threads"
          :key="thread.id"
          @selectThread="selectThread"
        />
      </div>
    </div>
    <div class="chatbot-threads__new-thread">
      <div class="chatbot-threads__new-thread__title" @click="createThread">
        New Thread
      </div>
      <div class="chatbot-threads__new-thread-description">
        Click here to create a new thread
      </div>
    </div>
  </div>
  <div v-else class="chatbot-threads__minimize" @click="show = true">
    <i class="fas fa-comment-alt" />
  </div>
</template>

<script>
export default {
  emits: ['loading'],
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    async selectThread(thread) {
      console.log('selectThread', thread);
      this.$emit('loading', true);
      await this.$store.dispatch('chatbot/selectThread', thread);
      this.$cookies.set('selectedThread', thread);
      this.$emit('loading', false);
    },
    async createThread() {
      this.$emit('loading', true);
      await this.$store.dispatch('chatbot/createThread');
      const thread = this.threads[this.threads.length - 1];
      await this.$store.dispatch('chatbot/selectThread', thread);
      this.$cookies.set('selectedThread', thread);
      this.$emit('loading', false);
    },
    async deleteThread(threadId) {
      this.$emit('loading', true);
      await this.$store.dispatch('chatbot/deleteThread', threadId);
      this.$cookies.remove('selectedThread');
      this.$emit('loading', false);
    },
  },
};
</script>

<style lang="scss">
.chatbot-threads {
  position: relative;
  top: 0;
  right: 0;
  width: 300px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 20;
  
  @include respond(mobile) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  
  
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
    &-title {
      font-size: 18px;
      font-weight: bold;
    }
    &-close {
      cursor: pointer;
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
  }

  &__new-thread {
    padding: 10px;
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
      background-color: #eee;
    }
    &-title {
      font-size: 16px;
      font-weight: bold;
    }
    &-description {
      font-size: 14px;
      color: #999;
    }
  }

  &__minimize {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    i {
      font-size: 20px;
    }

    &:hover {
      background-color: #eee;
    }
  }
}
</style>
