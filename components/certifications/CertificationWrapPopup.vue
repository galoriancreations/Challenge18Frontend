<template>
  <CertificationPopup
    :active="active && showModal"
    :sent="sent"
    :outOf="outOf"
  />
</template>

<script>
import popupModal from '~/mixins/popup-modal';

export default {
  mixins: [popupModal],
  inject: ['setConfirmModal'],
  props: {
    sent: 0,
    outOf: 0,
    active: Boolean,
  },
  watch: {
    active() {
      this.showModal = this.active;
    },
  },
};
</script>

<style lang="scss">
.popup-modal {
  &__buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
  }
}
</style>
