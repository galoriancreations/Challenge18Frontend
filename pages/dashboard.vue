<template>
  <Page title="Dashboard" name="dashboard">
    <WhiteSection tag="main" class="dashboard">
      <AccountDetails />
      <ClubPlayers />
      <MyChallenges />
      <MyDrafts />
    </WhiteSection>
    <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />
  </Page>
</template>

<script>
import AccountDetails from "../components/content/AccountDetails";
import ClubPlayers from "../components/content/ClubPlayers";
import MyChallenges from "../components/content/MyChallenges";
import MyDrafts from "../components/content/MyDrafts";
import confirmModal from "../mixins/confirm-modal";

export default {
  components: { AccountDetails, MyChallenges, ClubPlayers, MyDrafts },
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
    }
  }
};
</script>
