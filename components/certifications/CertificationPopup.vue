<template>
  <PopupModal
    title="Certifications Sent"
    :active="active"
    class="certification-popup-modal"
  >
    <h3>Sent {{ sent }} out of {{ outOf }} certifications</h3>
    <p>
      The certifications was sent to the members successfully.
    </p>
    <div class="certification-popup-modal__buttons">
      <BaseButton variant="blue" @click="close">
        Close
      </BaseButton>
    </div>
  </PopupModal>
</template>

<script>
export default {
  inject: ['closeModal'],
  emits: ['close'],
  data() {
    return {
      clickHandler: null,
    };
  },
  props: {
    active: true,
    sent: 0,
    outOf: 0,
  },
  methods: {
    close() {
      this.closeModal();
      this.active = false;
      this.$emit('close');
    },
  },
  mounted() {
    this.clickHandler = (e) => {
      if (e.target.classList.contains('modal__backdrop')) {
        this.close();
      }
    };
    window.addEventListener('click', this.clickHandler);
  },
  unmounted() {
    window.removeEventListener('click', this.clickHandler);
  },
};
</script>

<style lang="scss">
.certification-popup-modal {
  > {
    overflow: hidden;
  }

  &__buttons {
    margin-top: 2rem;
  }
}
</style>
