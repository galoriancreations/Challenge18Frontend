<template>
  <DashboardSection title="Created Challenges" class="my-challenges">
    <div v-if="!hasChallenges" class="my-challenges__empty">
      <p>Challenges you created will appear here.</p>
      <p>Click the button below to create your first challenge.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-card :elevation="1">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:[`item.edit`]="{ item }">
            <DashboardButton type="edit" @click="item.edit" />
          </template>
        </v-data-table>
      </v-card>
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="modalOpen = true" />
    </template>
    <template slot="modal">
      <CreateChallenge :active="modalOpen" />
    </template>
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "../../assets/util/functions";
import Scrollbar from "smooth-scrollbar";

export default {
  inject: ["io"],
  data() {
    return {
      modalOpen: false,
      headers: [
        { text: "Name", value: "name" },
        { text: "Language", value: "language" },
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
        id: challenge.id,
        name: challenge.name,
        language: challenge.language,
        edit: () => this.editChallenge(challenge.id)
      }));
    }
  },
  methods: {
    editChallenge(challengeId) {
      this.$cookies.set("challengeId", challengeId);
      this.$cookies.remove("selectedTemplate");
      this.$cookies.remove("draftId");
      this.$router.push("/challenge-editor");
    }
  },
  provide() {
    return {
      closeModal: () => {
        this.modalOpen = false;
      }
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

  &__table-container {
    margin-bottom: 1.5rem;
    width: 100%;
    align-self: flex-start;
  }

  &__table {
    line-height: 1.6;

    .scrollbar-track {
      z-index: 50;
    }
  }
}
</style>
