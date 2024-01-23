<template>
  <div
    class="chatbot-thread"
    @click="selectThread"
    :class="{ 'chatbot-thread__active': active }"
  >
    <div class="chatbot-thread__title">
      <div ref="threadTitle">
        <textarea-autosize
          :value.prevent="thread.title || 'Untitled'"
          @input="changeTitle($event)"
          @keydown.native.enter.prevent
          :rows="1"
        />
      </div>

      <div class="chatbot-thread__delete" @click.stop="deleteThread">
        <i class="fas fa-trash-alt" />
      </div>
    </div>
    <div class="chatbot-thread__description">
      {{ thread.id }}
    </div>
    <div class="chatbot-thread__time">
      {{ formattedTime() }}
    </div>
  </div>
</template>

<script>
import { formatTime } from '~/assets/util/functions';

export default {
  inject: ['addNotification', 'setConfirmModal'],
  emits: ['selectThread', 'selectFirstThread', 'loading'],
  data() {
    return {
      saveTimeout: null,
    };
  },
  props: {
    thread: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formattedTime() {
      return formatTime(this.thread.created_at);
    },
    async changeTitle(value) {
      if (value === 'Untitled') {
        return;
      }
      const title = value.trim();
      if (title.length < 1 || this.thread?.title === title) {
        return;
      }

      clearTimeout(this.saveTimeout);
      this.saveTimeout = setTimeout(async () => {
        this.$emit('loading', true);
        await this.$store.dispatch('chatbot/changeThreadTitle', {
          assistant: this.council,
          thread: this.thread,
          title,
        });
        this.$emit('loading', false);
        this.addNotification(
          `Thread title changed to <strong>${title}</strong>`
        );
      }, 3000);
    },
    selectThread() {
      // check if thread title is selected, if so, do not select thread
      const selection = window.getSelection();
      if (selection.anchorNode !== this.$refs.threadTitle) {
        this.$emit('selectThread', this.thread);
      }
    },
    async deleteThread() {
      this.setConfirmModal(
        'Are you sure you want to delete this thread?',
        async () => {
          this.$emit('loading', true);
          await this.$store.dispatch('chatbot/deleteThread', {
            assistant: this.council,
            thread: this.thread,
          });
          if (this.active) {
            this.$emit('selectFirstThread');
          }
          this.$emit('loading', false);
        }
      );
    },
  },
  computed: {
    council() {
      return this.$store.getters['chatbot/council'];
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
    display: flex;
    justify-content: space-between;
  }

  &__description {
    font-size: 14px;
    color: #999;
  }

  &__delete {
    visibility: hidden;
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
    font-size: 14px;
    color: #999;
    float: right;
  }

  &__active {
    background-color: #eee;
  }
}
</style>
