<template>
  <CertificationPopup
    :active="active"
    :sent="sent"
    :outOf="outOf"
    @close="$emit('close')"
  />
</template>

<script>
import popupModal from '~/mixins/popup-modal';

export default {
  emits: ['close'],
  mixins: [popupModal],
  props: {
    active: false,
    sent: 0,
    outOf: 0,
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
