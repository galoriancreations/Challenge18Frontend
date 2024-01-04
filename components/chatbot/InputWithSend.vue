<template>
  <section class="chatbot-input">
    <textarea-autosize
      placeholder="Type a message..."
      v-model="message"
      @keydown.native.enter.exact.prevent="sendMessage()"
      :rows="1"
    />
    <div class="chatbot-input__button">
      <BaseButton
        @click="sendMessage"
        :variant="loading ? 'darkblue' : 'blue'"
        :disabled="loading"
        >Send</BaseButton
      >
    </div>
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
      if (this.message.length > 1) {
        this.$emit('sendMessage', this.message);
        this.message = '';
      }
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
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;

  textarea {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background-color: #f5f5f5;
    font-size: 1.8rem;
    color: #333;
    outline: none;
    transition: all 0.2s;

    &:focus {
      background-color: #fff;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    }
  }

  &__button {
    align-self: flex-start;
  }
}
</style>
