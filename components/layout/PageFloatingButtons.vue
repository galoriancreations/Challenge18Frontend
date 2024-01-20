<template>
  <div class="floating-buttons-wrapper">
    <FloatingButtons>
      <ActionButton
        v-if="!loadingTemplates"
        type="add"
        color="blue"
        @click="showModal = true"
      />
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
  inject: ["isLoadingTemplates"],
  computed: {
    loadingTemplates() {
      return this.isLoadingTemplates();
    }
  },
  methods: {
    openWhatsapp() {

    if(this.$route.name === 'BeneficialAgiAction')
    {
        window.open("https://wa.me/", "_blank");
    }
    else
    {
        window.open("https://wa.me/972559721123", "_blank");
    }
    }
  }
};
</script>
