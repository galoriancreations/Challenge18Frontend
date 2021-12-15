<template>
  <div class="page">
    <TheHeader />
    <PageHeading v-if="showHeading" />
    <WhiteSection v-if="mainSection" tag="main" :class="name">
      <slot />
    </WhiteSection>
    <slot v-else />
    <CreateChallenge v-if="!isEditor" :active="showModal" />
    <FloatingButtons v-if="!isEditor">
      <ActionButton type="add" color="blue" @click="showModal = true" />
      <ActionButton
        type="whatsapp"
        color="azure"
        category="fab"
        @click="openWhatsapp"
      />
    </FloatingButtons>
    <Notifications v-if="!isEditor" :items="notifications" />
    <TheFooter />
  </div>
</template>

<script>
import popupModal from "~/mixins/popup-modal";

export default {
  mixins: [popupModal],
  props: {
    title: String,
    name: String,
    showHeading: {
      type: Boolean,
      default: true
    },
    mainSection: {
      type: Boolean,
      default: true
    }
  },
  head() {
    return {
      title: this.title && `${this.title} – Challenge 18`
    };
  },
  computed: {
    notifications() {
      return this.$store.getters["notifications/items"];
    },
    isEditor() {
      return this.$route.name === "editor";
    }
  },
  methods: {
    openWhatsapp() {
      window.open("https://wa.me/972559721123", "_blank");
    }
  },
  mounted() {
    if (this.$route.name !== "login") {
      window.scrollTo(0, 0);
    }
  },
  provide() {
    return {
      name: this.name,
      title: this.title
    };
  }
};
</script>

<style lang="scss">
.page {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  position: relative;
  z-index: 10;
}
</style>
