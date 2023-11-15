<template>
    <Page title="Group-page" name="dashboard">
      <WelcomeModal :active="showWelcomeModal" />
      <ConfirmModal
      :active="showConfirmModal"
      :text="confirmText"
      @confirm="confirmAction"
    />


    <groupchat />

  </Page>
</template>
  
  <script>
  import confirmModal from "~/mixins/confirm-modal";
  
  export default {
    mixins: [confirmModal],
    meta: {
      requiresAuth: true
    },
    async asyncData({ store: { dispatch }, from, error }) {
      if (!from?.meta[0]?.forLoggingIn) {
        try {
          // await Promise.all([dispatch("updateUser"), dispatch("loadTemplates")]);
        await dispatch('updateUser')
        await dispatch('loadTemplates')
        } catch (err) {
          error(err);
        }
      }
    },
    data() {
      return {
        showWelcomeModal: false
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      },
      isOrganization() {
        return true;
        return this.user?.accountType === "organization";
      },
      isAdmin() {
        return this.$store.getters.isAdmin;
      }
    },
    mounted() {
      setTimeout(() => {
        if (this.$cookies.get("newRegistration")) {
          this.showWelcomeModal = true;
          this.$cookies.remove("newRegistration");
        }
      }, 500);
    }
  };
  </script>
  