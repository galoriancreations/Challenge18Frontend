<template>
  <div
    class="chatbot-threads-container"
    :class="{ chatbotThreadsContainerWidth: show }"
  >
    <div class="chatbot-threads" :class="{ chatbotThreadsShow: show }">
      <div class="chatbot-threads__header">
        <div class="chatbot-threads__header-title">Chatbots</div>
        <div class="chatbot-threads__header-close" @click="show = !show">
          <i class="fas fa-times" />
        </div>
      </div>
      <div class="chatbot-threads__content">
        <div class="chatbot-threads__content-thread">
          <ChatBotThread
            v-for="thread in threads"
            :thread="thread"
            :key="thread.id"
            :active="thread.id === activeThread.id"
            @selectThread="selectThread"
            @selectFirstThread="$emit('selectFirstThread')"
          />
        </div>
      </div>
      <div class="chatbot-threads__new-thread" @click="createThread">
        <div class="chatbot-threads__new-thread__title">
          New Thread
        </div>
        <div class="chatbot-threads__new-thread-description">
          Click here to create a new thread
        </div>
      </div>
    </div>
    <div v-if="!show" class="chatbot-threads__minimize" @click="show = true">
      <i class="far fa-comments" />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['loading', 'selectFirstThread'],
  props: {
    threads: {
      type: Array,
      required: true,
    },
    activeThread: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      show: false,
      saveTimeout: null,
    };
  },
  methods: {
    async selectThread(thread) {
      this.$emit('loading', true);
      await this.$store.dispatch('chatbot/selectThread', {
        assistantId: this.council.id,
        thread,
      });
      this.$cookies.set('selectedThread', thread);
      this.$emit('loading', false);
    },
    async createThread() {
      this.$emit('loading', true);
      await this.$store.dispatch('chatbot/createThread', this.council.id);
      const thread = this.threads[this.threads.length - 1];
      await this.$store.dispatch('chatbot/selectThread', {
        assistantId: this.council.id,
        thread,
      });
      this.$cookies.set('selectedThread', thread);
      this.$emit('loading', false);
    },
  },
  computed: {
    council() {
      return this.$cookies.get('selectedCouncil');
    },
  },
};
</script>

<style lang="scss">
$chatbotThreadsContainerWidth: 300px;

.chatbot-threads {
  position: relative;
  top: 0;
  right: 0;
  width: $chatbotThreadsContainerWidth;
  height: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 1;
  animation: slide-in-right 0.3s ease both;
  overflow: hidden;

  @include respond(tablet) {
    animation: slide-in-up 0.3s ease both;
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
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

      i {
        font-size: 20px;
        @include respond(mobile) {
          font-size: 16px;
        }
      }

      &:hover {
        color: #999;
      }
    }
  }

  &__content {
    flex: 1;
    overflow-y: auto;
  }

  &__new-thread {
    padding: 10px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 1;
    background-color: #cccccc6c;
    padding: 1rem;

    i {
      font-size: 30px;

      @include respond(mobile) {
        font-size: 20px;
      }

      @include respond(tablet) {
        font-size: 20px;
      }
    }

    &:hover {
      background-color: #eee;
    }
  }
}

// if chatbotThreadsContainerWidth is not 0, then hide the chatbot-threads-container with animation
.chatbot-threads-container:not(.chatbotThreadsContainerWidth) {
  animation: to-zero-width 0.3s ease both;
  // position: absolute;
  overflow: hidden;

  @include respond(tablet) {
    animation: none;
    height: 0;
  }
}

.chatbot-threads-container.chatbotThreadsContainerWidth {
  animation: to-normal-width 0.3s ease both;
  width: $chatbotThreadsContainerWidth;
  overflow: hidden;

  @include respond(tablet) {
    height: $chatbotThreadsContainerWidth;
    width: 0;
    animation: to-normal-height 0.3s ease both;
  }
}

// if chatbotThreadsShow is not true, then hide the chatbot-threads with animation
.chatbot-threads:not(.chatbotThreadsShow) {
  animation: slide-out-right 0.3s ease both;

  @include respond(tablet) {
    animation: slide-down 0.3s ease both;
  }
}

@keyframes slide-out-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-1000px);
  }
}

@keyframes slide-in-right {
  0% {
    transform: translateX(-1000px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slide-in-up {
  0% {
    transform: translateY(1000px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes slide-down {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(1000px);
  }
}

@keyframes to-normal-height {
  0% {
    max-height: 0;
  }
  100% {
    max-height: 100%;
  }
}

@keyframes to-zero-width {
  0% {
    max-width: $chatbotThreadsContainerWidth;
  }
  100% {
    max-width: 0;
    overflow: visible;
  }
}

@keyframes to-normal-width {
  0% {
    max-width: 0;
  }
  100% {
    max-width: $chatbotThreadsContainerWidth;
  }
}
</style>
