<template>
  <Page title="Dashboard" name="dashboard">
    <WhiteSection tag="main" class="dashboard">
      <AccountDetails />
      <ClubPlayers v-if="isOrganization" />
      <MyChallenges />
      <PublicTemplates v-if="isAdmin" />
      <MyTemplates v-if="isOrgnization || isAdmin" />
      <MyDrafts v-if="isOrgnization || isAdmin" />
    </WhiteSection>
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
  </Page>
</template>

<script>
import AccountDetails from "../components/dashboard/AccountDetails";
import ClubPlayers from "../components/dashboard/ClubPlayers";
import MyChallenges from "../components/dashboard/MyChallenges";
import MyTemplates from "../components/dashboard/MyTemplates";
import PublicTemplates from "../components/dashboard/PublicTemplates";
import MyDrafts from "../components/dashboard/MyDrafts";
import confirmModal from "../mixins/confirm-modal";

export default {
  components: {
    AccountDetails,
    MyChallenges,
    PublicTemplates,
    MyTemplates,
    ClubPlayers,
    MyDrafts
  },
  mixins: [confirmModal],
  meta: {
    requiresAuth: true
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
