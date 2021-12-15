<template>
  <div class="floating-buttons-wrapper">
    <FloatingButtons>
      <ActionButton type="add" color="blue" @click="showModal = true" />
      <ActionButton
        type="whatsapp"
        color="azure"
        category="fab"
        @click="openWhatsapp"
      />
    </FloatingButtons>
    <CreateChallenge :active="showModal" />
  </div>
</template>

<script>
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  methods: {
    openWhatsapp() {
      window.open("https://wa.me/972559721123", "_blank");
    }
  }
};
</script>
