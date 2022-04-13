<template>
  <DashboardSection title="All Users" class="all-users">
    <BaseSpinner v-if="fetching" :style="{ position: 'relative' }" />
    <ErrorMessage v-else-if="error" :error="error" />
    <DashboardTable v-model="selected" :headers="headers" :items="items" />
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import _ from "lodash";

export default {
  inject: ["setConfirmModal", "addNotification"],
  data() {
    return {
      headers: [
        { text: "Username", value: "username" },
        { text: "Phone", value: "phone", filterable: false },
        { text: "Full Name", value: "name" },
        { text: "Account Type", value: "accountType" },
        { text: "Admin", value: "isAdmin", filterable: false }
      ],
      loading: false,
      selected: [],
      search: "",
      fetching: true,
      error: null
    };
  },
  computed: {
    users() {
      return this.$store.getters["admin/users"];
    },
    items() {
      return this.users.map(user => ({
        ...user,
        name: user.fullName || user.organization,
        accountType: _.capitalize(user.accountType),
        isAdmin: user.isAdmin || user.accountType === "admin" ? "Yes" : "No"
      }));
    }
  },
  methods: {
    deleteUser(user) {
      this.setConfirmModal(
        "Are you sure you want to delete this user? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", { deleteUser: user._id });
          await this.$store.dispatch("admin/loadUsers");
          this.loading = false;
          this.addNotification(
            `Successfully deleted user: <strong>${user.username}</strong>.`
          );
          this.selected = this.selected.filter(
            selection => selection._id !== user._id
          );
        }
      );
    },
    deleteSelected() {
      const selections = [...this.selected];
      if (selections.length === 1) {
        return this.deleteUser(selections[0]);
      }
      this.setConfirmModal(
        `Are you sure you want to delete these ${selections.length} users? This action is irreversible.`,
        async () => {
          this.loading = true;
          const requests = selections.map(user =>
            this.$axios.$post("/xapi", { deleteUser: user._id })
          );
          await Promise.all(requests);
          await this.$store.dispatch("admin/loadUsers");
          this.addNotification(
            `Successfully deleted <strong>${selections.length} users</strong>.`
          );
          this.loading = false;
          this.selected = [];
        }
      );
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("admin/loadUsers");
      this.fetching = false;
    } catch (error) {
      this.error = error;
    }
  },
  provide() {
    return {
      deleteSelected: this.deleteSelected
    };
  }
};
</script>
