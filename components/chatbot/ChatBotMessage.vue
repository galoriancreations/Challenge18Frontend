<template>
  <div class="message" :class="`message__${message.role}`">
    <div class="message__icon">
      <i
        v-if="message.role === 'assistant'"
        class="fas fa-robot message__icon__assistant"
      />
      <i v-else class="fas fa-user message__icon__user" />
    </div>
    <div class="message__text" v-text="message.text" />
    <div class="message__timestamp">
      {{ formattedDate }}
    </div>
  </div>
</template>

<script>
import { formatTime } from '~/assets/util/functions';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      return formatTime(this.message.createdAt);
    },
  },
};
</script>

<style lang="scss">
.message {
  display: flex;
  position: relative;
  flex-direction: row;
  margin-block: 1.5rem;
  width: 100%;

  @include respond(mobile) {
    width: 100%;
    padding: 0;
  }

  &__text {
    margin-right: 1rem;
    padding: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
    white-space: pre-wrap;
    text-wrap: wrap;

    @include respond(mobile) {
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }

  &__icon {
    align-self: flex-start;
    width: 3rem;
    height: 3rem;
    background-color: #e8ecef;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;

    i {
      font-size: 2rem;
      padding: 0.5rem;
      border-radius: 50%;
    }

    &__assistant {
      position: relative;
    }

    &__user {
      color: #4c9cd4;
    }
  }

  &__timestamp {
    font-size: 1rem;
    color: #999;
    bottom: -1.5rem;
    align-self: flex-end;

    @include respond(mobile) {
      bottom: -1rem;
    }
  }
}
</style>
