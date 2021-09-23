<template>
  <div class="top-challenges__item" v-on="$listeners">
    <button class="top-challenges__img" @click="showModal = true">
      <img :src="challenge.image" :alt="challenge.title" />
    </button>
    <PopupModal :active="showModal" class="top-challenges__modal">
      <h2 class="top-challenges__title">
        {{ challenge.title }}
      </h2>
      <div class="top-challenges__text">
        <p v-for="paragraph in text" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
      <BaseButton v-if="!isLoggedIn" variant="blue" link="/join">
        Join Us
      </BaseButton>
    </PopupModal>
  </div>
</template>

<script>
import popupModal from "../../mixins/popup-modal";

export default {
  mixins: [popupModal],
  props: {
    challenge: Object
  },
  computed: {
    text() {
      return this.challenge.text.split("\n");
    },
    isLoggedIn() {
      return this.$store.getters.isAuth;
    }
  }
};
</script>

<style lang="scss">
.top-challenges {
  &__item {
    @include respond(mobile) {
      max-width: 25rem;
      margin: auto;
    }
  }

  &__img {
    cursor: pointer;
    display: block;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    overflow: hidden;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      transition: all 0.5s;
    }

    &:hover::after {
      background-color: rgba($color-azure, 0.4);
    }

    img {
      width: 100%;
      display: block;
    }
  }

  &__title {
    color: $color-blue-2;
    font-size: 3.5rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    p {
      &:not(:last-child) {
        margin-bottom: 2rem;
      }
    }
  }

  &__modal {
    .button {
      margin-top: 3rem;
    }
  }
}
</style>
