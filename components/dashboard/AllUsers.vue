<template>
  <DashboardSection title="All Users" class="all-users">
    <div class="my-challenges__table-container">
      <v-app>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          show-select
          item-key="username"
          class="elevation-2"
        >
          <template v-slot:[`item.delete`]="{ item }">
            <DashboardButton type="delete" @click="item.delete" />
          </template>
        </v-data-table>
      </v-app>
      <DeleteSelectedButton :disabled="!selected.length" />
    </div>
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
        { text: "Full Name", value: "name" },
        { text: "Account Type", value: "accountType" },
        { text: "Admin", value: "isAdmin" },
        { text: "Delete", value: "delete", sortable: false }
      ],
      loading: false,
      selected: []
    };
  },
  computed: {
    users() {
      return this.$store.getters["users/users"];
    },
    items() {
      return this.users.map(user => ({
        ...user,
        name: user.fullName || user.organization,
        accountType: _.capitalize(user.accountType),
        isAdmin: user.isAdmin || user.accountType === "admin" ? "Yes" : "No",
        delete: () => this.deleteUser(user)
      }));
    }
  },
  methods: {
    deleteUser(user) {
      this.setConfirmModal(
        "Are you sure you want to delete this user? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", { deleteUser: user.id });
          await this.$store.dispatch("users/loadUsers");
          this.loading = false;
          this.addNotification(
            `Successfully deleted user: <strong>${user.username}</strong>.`
          );
          this.selected = this.selected.filter(
            selection => selection.id !== user.id
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
            this.$axios.$post("/xapi", { deleteUser: user.id })
          );
          await Promise.all(requests);
          await this.$store.dispatch("users/loadUsers");
          this.addNotification(
            `Successfully deleted <strong>${selections.length} users</strong>.`
          );
          this.loading = false;
          this.selected = [];
        }
      );
    }
  },
  provide() {
    return {
      deleteSelected: this.deleteSelected
    };
  }
};
</script>
