<template>
  <Page title="Dashboard" name="dashboard">
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
    <AccountDetails />
    <ClubPlayers v-if="isOrganization" />
    <CreatedChallenges />
    <PublicTemplates v-if="isAdmin" />
    <MyTemplates />
    <MyDrafts />
  </Page>
</template>

<script>
import confirmModal from "../mixins/confirm-modal";

export default {
  mixins: [confirmModal],
  meta: {
    requiresAuth: true
  },
  async asyncData({ store }) {
    if (process.client) {
      try {
        await Promise.all([
          store.dispatch("updateUser"),
          store.dispatch("loadTemplates")
        ]);
      } catch {}
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isOrganization() {
      return this.user?.accountType === "organization";
    },
    isAdmin() {
      return this.user?.accountType === "admin";
    }
  }
};
</script>
