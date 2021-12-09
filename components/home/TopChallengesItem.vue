<template>
  <div class="top-challenges__item">
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
      <BaseButton v-if="showButton" variant="blue" :link="link">
        {{ challenge.linkText || "Join Us" }}
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
    },
    link() {
      return this.challenge.link || "/join";
    },
    showButton() {
      return !this.isLoggedIn || !!this.challenge.link;
    }
  }
};
</script>

<style lang="scss">
.top-challenges {
  &__img {
    cursor: pointer;
    display: block;
    border-radius: 0.8rem;
    box-shadow: $boxshadow2;
    height: 100%;
    overflow: hidden;
    transition: all 0.4s;
    position: relative;
    z-index: 0;

    &:hover {
      transform: scale(1.3);
      z-index: 1;
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
