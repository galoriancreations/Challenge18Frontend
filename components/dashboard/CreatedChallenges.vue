<template>
  <DashboardSection title="Created Challenges" class="my-challenges">
    <div v-if="!hasChallenges" class="my-challenges__empty">
      <p>Challenges you created will appear here.</p>
      <p>Click the button below to create your first challenge.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-app>
        <v-data-table :headers="headers" :items="items" class="elevation-2">
          <template v-slot:[`item.edit`]="{ item }">
            <DashboardButton type="edit" @click="item.edit" />
          </template>
        </v-data-table>
      </v-app>
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="showModal = true" />
    </template>
    <template slot="modal">
      <CreateChallenge :active="showModal" />
    </template>
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject, currentDay } from "../../assets/util/functions";
import popupModal from "../../mixins/popup-modal";

export default {
  mixins: [popupModal],
  data() {
    return {
      headers: [
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
        { text: "No. of Users", value: "numOfUsers" },
        { text: "Active", value: "isActive" },
        { text: "Current Day", value: "currentDay" },
        { text: "Edit", value: "edit", sortable: false }
      ]
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
        currentDay: currentDay(challenge.startDate),
        edit: () => this.editChallenge(challenge.id)
      }));
    }
  },
  methods: {
    editChallenge(challengeId) {
      this.$cookies.set("challengeId", challengeId);
      this.$cookies.remove("selectedTemplate");
      this.$cookies.remove("draftId");
      this.$router.push("/editor");
    }
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

  &__table-container {
    margin-bottom: 1.5rem;
    width: 100%;
    align-self: flex-start;

    & > .button {
      margin-top: 4rem !important;

      i {
        margin-right: 0.5rem;
      }
    }
  }

  &__table {
    line-height: 1.6;

    .scrollbar-track {
      z-index: 50;
    }
  }
}
</style>
