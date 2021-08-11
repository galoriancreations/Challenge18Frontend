<template>
  <div :class="classes">
    <div class="modal__container">
      <i class="modal__close fa fa-times" @click="closeModal" />
      <h2 class="modal__heading">{{ heading }}</h2>
      <p class="modal__text">{{ text }}</p>
    </div>
    <div class="modal__backdrop" @click="closeModal" />
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean,
    error: Boolean
  },
  inject: ["closeModal"],
  computed: {
    classes() {
      return {
        modal: true,
        active: this.active,
        error: this.error
      };
    },
    heading() {
      return !this.error ? "Thank you for reaching out!" : "An error occured";
    },
    text() {
      return !this.error
        ? "We'll be in touch soon."
        : "Please try again in a few moments.";
    }
  }
};
</script>
