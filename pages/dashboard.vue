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

export default {
  components: { AccountDetails, MyChallenges, ClubPlayers, MyDrafts },
  meta: {
    requiresAuth: true
  },
  data() {
    return {
      showConfirmModal: false,
      confirmText: "",
      confirmAction: () => {}
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isOrganization() {
      return this.user?.accountType === "organization";
    }
  },
  methods: {
    setConfirmModal(text, action) {
      this.showConfirmModal = true;
      this.confirmText = text;
      this.confirmAction = action;
    },
    enterKeyHandler(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        if (this.showConfirmModal) {
          this.confirmAction();
        }
        this.showConfirmModal = false;
      } else if (event.key === "Escape") {
        this.showConfirmModal = false;
      }
    }
  },
  mounted() {
    document.addEventListener("keydown", this.enterKeyHandler);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.enterKeyHandler);
  },
  provide() {
    return {
      setConfirmModal: this.setConfirmModal,
      closeModal: () => {
        this.showConfirmModal = false;
      }
    };
  }
};
</script>
