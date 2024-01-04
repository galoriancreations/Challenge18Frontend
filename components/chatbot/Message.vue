<template>
  <div class="message" :class="`message__${message.sender}`">
    <div class="message__icon">
      <i
        v-if="message.sender === 'assistant'"
        class="fas fa-robot message__icon__assistant"
      />
      <i v-else class="fas fa-user message__icon__user" />
    </div>
    <div class="message__text">
      {{ message.text }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
};
</script>

<style lang="scss">
.message {
  display: flex;
  flex-direction: row;
  margin-block: 1.25rem;
  width: 100%;

  &__text {
    margin-right: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  }

  &__icon {
    align-self: flex-start;
    width: 4rem;

    i {
      font-size: 2rem;
      padding: 0.5rem;
      border-radius: 50%;
      margin-right: 1rem;
    }

    &__assistant {
      background-color: #e8ecef;
      position: relative;
      right: 1px;
    }

    &__user {
      background-color: #f5f5f5;
      color: #4c9cd4;
    }
  }
}
</style>
