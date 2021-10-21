<template>
  <DashboardSection title="Created Challenges" class="my-challenges">
    <div v-if="!hasChallenges" class="my-challenges__empty">
      <p>Challenges you created will appear here.</p>
      <p>Click the button below to create your first challenge.</p>
    </div>
    <DashboardTable
      v-else
      v-model="selected"
      :headers="headers"
      :items="items"
    />
    <template slot="button">
      <ActionButton type="add" color="blue" @click="showModal = true" />
    </template>
    <template slot="modal">
      <CreateChallenge :active="showModal" />
    </template>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject, currentDay } from "../../assets/util/functions";
import popupModal from "../../mixins/popup-modal";

export default {
  mixins: [popupModal],
  inject: ["setConfirmModal", "addNotification"],
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
        { text: "Users", value: "numOfUsers" },
        { text: "Active", value: "isActive" },
        { text: "Day", value: "currentDay" },
        { text: "Actions", value: "actions", sortable: false }
      ],
      selected: [],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasChallenges() {
      return this.user?.createdChallenges && this.challenges.length > 0;
    },
    challenges() {
      return dataArrayFromObject(this.user.createdChallenges);
    },
    items() {
      return this.challenges.map(challenge => ({
        ...challenge,
        numOfUsers: Object.keys(challenge.scores).length,
        isActive: challenge.isActive ? "Yes" : "No",
        currentDay: currentDay(challenge.date),
        actions: {
          edit: () => this.editChallenge(challenge.id),
          delete: () => this.deleteChallenge(challenge)
        }
      }));
    }
  },
  methods: {
    editChallenge(challengeId) {
      this.$cookies.set("challengeId", challengeId);
      this.$cookies.remove("selectedTemplate");
      this.$cookies.remove("draftId");
      this.$router.push("/editor");
    },
    deleteChallenge(challenge) {
      this.setConfirmModal(
        "Are you sure you want to delete this challenge? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/xapi", { deleteChallenge: challenge.id });
          await this.$store.dispatch("updateUser");
          this.loading = false;
          this.addNotification(
            `Successfully deleted challenge: <strong>${challenge.name}</strong>.`
          );
          this.selected = this.selected.filter(
            selection => selection.id !== challenge.id
          );
        }
      );
    },
    deleteSelected() {
      const selections = [...this.selected];
      if (selections.length === 1) {
        return this.deleteChallenge(selections[0]);
      }
      this.setConfirmModal(
        `Are you sure you want to delete these ${selections.length} challenges? This action is irreversible.`,
        async () => {
          this.loading = true;
          const requests = selections.map(challenge =>
            this.$axios.$post("/xapi", { deleteChallenge: challenge.id })
          );
          await Promise.all(requests);
          await this.$store.dispatch("updateUser");
          this.addNotification(
            `Successfully deleted <strong>${selections.length} challenges</strong>.`
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

<style lang="scss">
.my-challenges {
  &__empty {
    p {
      text-align: center;
      font-size: 1.85rem;

      @include respond(mobile) {
        font-size: 1.6rem;
      }

      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
