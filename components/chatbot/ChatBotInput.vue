<template>
  <section class="chatbot-input">
    <textarea-autosize
      placeholder="Type a message..."
      v-model="message"
      @keydown.native.enter.exact.prevent="sendMessage()"
      :rows="1"
      class="chatbot-input__textarea"
    />
    <button
      class="chatbot-input__button"
      @click="sendMessage"
      :disabled="loading || message.trim().length < 1"
    >
      Send
    </button>
  </section>
</template>

<script>
export default {
  emits: ['sendMessage'],
  props: {
    loading: Boolean,
  },
  data() {
    return {
      message: '',
    };
  },
  methods: {
    sendMessage() {
      const message = this.message.trim();
      if (message.length) {
        this.$emit('sendMessage', message);
        this.message = '';
      }
    },
  },
  computed: {
    thread() {
      return this.$store.getters['chatbot/thread'];
    },
  },
  watch: {
    thread() {
      this.message = '';
    },
  },
};
</script>

<style lang="scss">
.chatbot-input {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 0.5rem;

  textarea {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    font-size: 1.8rem;
    color: #333;
    transition: all 0.2s;

    &:focus {
      background-color: #fff;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }

    &::placeholder {
      color: #999;
    }

    @include respond(mobile) {
      font-size: 1.6rem;
    }
  }

  &__button {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #4c9cd4;
    color: #fff;
    font-size: 1.8rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #3a8ac0;
    }

    &:disabled {
      background-color: #999;
      cursor: not-allowed;
    }

    @include respond(mobile) {
      font-size: 1.6rem;
    }
  }
}
</style>
