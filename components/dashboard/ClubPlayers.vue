<template>
  <DashboardSection title="Club Players" class="club-players">
    <div v-if="!hasPlayers" class="my-challenges__empty">
      <p>You haven't listed any players yet.</p>
      <p>Start adding your players to keep track of their scores and skills.</p>
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="showAddModal = true" />
    </template>
    <template slot="modal">
      <AddPlayer :active="showAddModal" />
    </template>
  </DashboardSection>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  data() {
    return {
      showAddModal: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    allPlayers() {
      return this.$store.getters["players/players"];
    },
    clubPlayers() {
      return this.allPlayers.filter(player => player.club === this.user?.id);
    },
    hasPlayers() {
      return this.clubPlayers.length > 0;
    }
  },
  methods: {
    closeModal() {
      this.showAddModal = false;
    }
  },
  provide() {
    return {
      closeModal: this.closeModal
    };
  }
};
</script>
