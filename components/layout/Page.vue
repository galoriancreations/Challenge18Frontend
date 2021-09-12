<template>
  <div class="page">
    <TheHeader />
    <PageHeading v-if="showHeading" />
    <WhiteSection v-if="mainSection" tag="main" :class="name">
      <slot />
    </WhiteSection>
    <slot v-else />
    <WhatsappButton v-if="$route.name !== 'challenge-editor'" />
    <Notifications
      v-if="$route.name !== 'challenge-editor'"
      :items="notifications"
    />
    <TheFooter />
  </div>
</template>

<script>
export default {
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
    }
  },
  mounted() {
    window.scrollTo(0, 0);
  },
  provide() {
    return {
      name: this.name,
      title: this.title,
      addNotification: item =>
        this.$store.commit("notifications/addItem", item),
      removeNotification: itemId =>
        this.$store.commit("notifications/removeItem", itemId)
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
