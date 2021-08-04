<template>
  <Page title="Dashboard" name="dashboard">
    <WhiteSection tag="main" class="dashboard">
      <AccountDetails />
      <ClubPlayers />
      <MyChallenges />
      <MyDrafts />
    </WhiteSection>
  </Page>
</template>

<script>
import AccountDetails from "../components/content/AccountDetails";
import ClubPlayers from "../components/content/ClubPlayers";
import MyChallenges from "../components/content/MyChallenges";
import MyDrafts from "../components/content/MyDrafts";

export default {
  components: { AccountDetails, MyChallenges, ClubPlayers, MyDrafts },
  meta: {
    requiresAuth: true
  },
  computed: {
    isOrganization() {
      return this.$store.getters.user?.accountType === "organization";
    }
  }
};
</script>
