<template>
  <Page title="Dashboard" name="dashboard">
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
    <Notifications :items="notifications" />
    <AccountDetails />
    <!-- <ClubPlayers v-if="isOrganization" /> -->
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
  data() {
    return {
      notifications: []
    };
  },
  async asyncData({ store, from }) {
    if (process.client && !from.meta[0]?.forLoggingIn) {
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
  },
  provide() {
    return {
      addNotification: item => {
        this.notifications.push(item);
      },
      removeNotification: id => {
        this.notifications = this.notifications.filter(
          notification => notification.id !== id
        );
      }
    };
  }
};
</script>
