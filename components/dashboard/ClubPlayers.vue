<template>
  <DashboardSection title="Club Players" class="club-players">
    <div v-if="!hasPlayers" class="my-challenges__empty">
      <p>You haven't listed any players yet.</p>
      <p>Start adding your players to keep track of their scores.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-app>
        <v-data-table :headers="headers" :items="items" class="elevation-2">
          <template v-slot:[`item.delete`]="{ item }">
            <DashboardButton type="delete" @click="item.delete" />
          </template>
        </v-data-table>
      </v-app>
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="showModal = true" />
    </template>
    <template slot="modal">
      <AddPlayer :active="showModal" />
    </template>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import dashboardModal from "~/mixins/dashboard-modal";
import { roleOptions } from "~/assets/util/options";

export default {
  mixins: [dashboardModal],
  inject: ["setConfirmModal", "addNotification"],
  data() {
    return {
      headers: [
        { text: "Username", value: "username" },
        { text: "Full Name", value: "fullName" },
        { text: "Role/Specialty", value: "role" },
        { text: "Total Score", value: "totalScore" },
        { text: "Delete", value: "delete", sortable: false }
      ],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    players() {
      return this.user.players;
    },
    items() {
      return this.players.map(player => ({
        ...player,
        role: roleOptions.find(role => role.value === player.role)?.label,
        totalScore: player.totalScore || 0,
        delete: () => this.deletePlayer(player)
      }));
    },
    hasPlayers() {
      return this.players?.length > 0;
    }
  },
  methods: {
    deletePlayer(player) {
      this.setConfirmModal(
        "Are you sure you want to delete this player? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", {
            deletePlayer: player.id
          });
          await this.$store.dispatch("updateUser");
          this.addNotification(
            `Successfully deleted player: <strong>${player.name}</strong>.`
          );
          this.loading = false;
        }
      );
    }
  }
};
</script>
