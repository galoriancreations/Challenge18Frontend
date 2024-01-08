<template>
  <div class="chatbot-thread" @click="selectThread">
    <div class="chatbot-thread__title" @click.stop="changeTitle">
      {{ thread.title || 'Untitled' }}
    </div>
    <div class="chatbot-thread__description">
      {{ thread.id }}
    </div>
    <div class="chatbot-thread__time">
      {{ formattedTime(thread.updated_at) }}
    </div>
    <div class="chatbot-thread__delete" @click="deleteThread(thread.id)">
      <i class="fas fa-trash-alt" />
    </div>
  </div>
</template>

<script>
import { formatTime } from '~/assets/util/functions';

export default {
  emits: ['selectThread'],
  props: {
    thread: {
      type: Object,
      required: true,
    },
  },
  methods: {
    deleteThread(threadId) {
      this.$emit('deleteThread', threadId);
    },
    formattedTime(time) {
      return formatTime(time);
    },
    selectThread() {
      this.$emit('selectThread', this.thread);
    },
    changeTitle() {
      const newTitle = prompt('Enter new title');
      if (newTitle) {
        this.$store.dispatch('chatbot/changeThreadTitle', {
          threadId: this.thread.id,
          title: newTitle,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.chatbot-thread {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  text-wrap: wrap;
  width: 100%;
  cursor: pointer;
  display: inline-block;
  word-break: break-all;

  &:hover {
    background-color: #eee;
  }

  &__title {
    font-size: 16px;
    font-weight: bold;
  }

  &__description {
    font-size: 14px;
    color: #999;
  }

  &__delete {
    visibility: hidden;
    float: right;
    font-size: 14px;
    color: #999;

    .chatbot-thread:hover & {
      visibility: visible;
    }

    cursor: pointer;
    &:hover {
      color: red;
    }
    
  }

  &__time {
    font-size: 12px;
    color: #999;
    float: left;
  }
}
</style>
