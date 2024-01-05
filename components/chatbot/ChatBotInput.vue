<template>
  <section class="chatbot-input">
    <textarea-autosize
      placeholder="Type a message..."
      v-model="message"
      @keydown.native.enter.exact.prevent="sendMessage()"
      :rows="1"
    />
    <div class="chatbot-input__button">
      <button
        @click="sendMessage"
        :variant="loading ? 'darkblue' : 'blue'"
        :disabled="loading"
        >Send</button
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
      width: 20% !important;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 8rem;
    height: 3.25rem;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: #4c9cd4;
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: #3a8ac0;
    }

    &:active {
      background-color: #2a7ab0;
    }

    button {
      color: #fff;
      font-size: 1.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      transition: all 0.2s;
    }
  }
}
</style>
