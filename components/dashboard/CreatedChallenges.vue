<template>
  <DashboardSection title="Created Challenges" class="my-challenges">
    <div v-if="!hasChallenges" class="my-challenges__empty">
      <p>Challenges you created will appear here.</p>
      <p>Click the button below to create your first challenge.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <vue-good-table
        class="results-table my-challenges__table"
        :columns="columns"
        :rows="challenges"
        theme="polar-bear"
        max-height="46rem"
        :fixed-header="fixedHeader"
      />
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="modalOpen = true" />
    </template>
    <template slot="modal">
      <!-- <JoinChallenge v-if="isIndividual" :active="modalOpen" /> -->
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
      columns: [
        { field: "name", label: "Name", sortable: false },
        { field: "language", label: "Language", sortable: false },
        { field: "day", label: "Day", sortable: false },
        { field: "numOfUsers", label: "Users", sortable: false },
        { field: "score", label: "Score", sortable: false },
        { field: "invite", label: "Invite", sortable: false }
      ],
      scrollbar: null,
      fixedHeader: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    hasChallenges() {
      return this.user?.myChallenges && this.challenges.length > 0;
    },
    isIndividual() {
      return this.user?.accountType === "individual";
    },
    challenges() {
      return dataArrayFromObject(this.user.myChallenges);
    },
    table() {
      return this.$el.querySelector(".vgt-responsive");
    }
  },
  methods: {
    manageTableScrollbar() {
      if (this.hasChallenges) {
        this.scrollbar = Scrollbar.init(this.table);
      }
      // this.io.on("myChallenges", () => {
      //   setTimeout(() => {
      //     if (!this.scrollbar) {
      //       this.scrollbar = Scrollbar.init(this.table);
      //     }
      //     this.scrollbar.scrollTop = 0;
      //   }, 10);
      // });
    },
    adjustTableHeader() {
      this.fixedHeader = window.innerWidth > 1000;
    },
    closeModal() {
      this.modalOpen = false;
    }
  },
  mounted() {
    this.manageTableScrollbar();
    this.adjustTableHeader();
    window.addEventListener("resize", this.adjustTableHeader);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.manageTableHeader);
  },
  provide() {
    return {
      closeModal: this.closeModal
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
