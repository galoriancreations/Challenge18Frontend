<template>
  <div class="message" :class="`message__${message.role}`">
    <div class="message__icon">
      <img
        v-if="message.role === 'assistant'"
        :src="activeCouncil.image"
        class="message__icon__assistant"
        :class="{ 'fas fa-robot': !activeCouncil.image }"
        :alt="`${activeCouncil.name} image`"
      />
      <img
        v-else-if="imageSrc"
        :src="imageSrc"
        class="message__icon__assistant"
        alt="User image"
      />
      <i v-else class="message__icon__user fas fa-user" />
    </div>
    <div class="message__text" v-text="message.text" />
    <div class="message__time">
      {{ formattedTime }}
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
    activeCouncil: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedTime() {
      return formatTime(this.message.createdAt);
    },
    imageSrc() {
      const { image } = this.$store.getters.user;
      return image ? this.$config.axios.baseURL + image : null;
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
    width: 30px;
    height: 30px;
    background-color: #e8ecef;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;

    img {
      border-radius: 50%;
      object-fit: cover;
      width: 30px;
      height: 30px;
    }

    i {
      font-size: 2.25rem;
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

  &__time {
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
