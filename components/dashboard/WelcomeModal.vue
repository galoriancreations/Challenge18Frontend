<template>
  <PopupModal :active="active" class="welcome-modal">
    <h3 class="welcome-modal__title">
      Welcome to Challenge 18
    </h3>
    <div class="welcome-modal__text">
      <p>
        Thank you for joining us and enjoy the Challenges! Check out your new
        dashboard.
      </p>
    </div>
    <BaseButton variant="blue" @click="closeModal">Get started</BaseButton>
  </PopupModal>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  inject: ["closeModal"]
};
</script>

<style lang="scss">
.welcome-modal {
  &__title {
    color: $color-blue-2;
    font-size: 3rem;
    margin-bottom: 3rem;

    @include respond(mobile) {
      font-size: 2.5rem;
      margin-bottom: 2.5rem;
    }
  }

  &__text {
    margin-bottom: 3rem;

    @include respond(mobile) {
      margin-bottom: 2.5rem;
    }
  }
}
</style>
