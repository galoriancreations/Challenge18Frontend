<template>
  <WhiteSection class="team-results">
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else class="team-results__grid">
      <div v-for="team in teams" :key="team.team" class="team-results__item">
        <SectionHeading>
          {{ team.team }}
        </SectionHeading>
        <vue-good-table
          class="results-table team-results__table"
          :columns="columns"
          :rows="team.users"
          theme="polar-bear"
        />
      </div>
    </div>
  </WhiteSection>
</template>

<script>
import { teamsArray } from "../../assets/util/functions";

export default {
  data() {
    return {
      columns: [
        {
          label: "Player",
          field: "name"
        },
        {
          label: "Score",
          field: "score"
        }
      ]
    };
  },
  computed: {
    loading() {
      return this.$store.getters["results/loading"];
    },
    error() {
      return this.$store.getters["results/error"];
    },
    results() {
      return this.$store.getters["results/results"];
    },
    teams() {
      return teamsArray(this.results).filter(team => team.users.length > 2);
    }
  }
};
</script>

<style lang="scss">
@import "../../assets/sass/base.scss";

.team-results {
  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 8.5rem;
    column-gap: 7rem;

    @include respond(tablet-sm) {
      column-gap: 5rem;
    }

    @include respond(mobile-land) {
      grid-template-columns: 1fr;
      row-gap: 6.5rem;
    }
  }

  &__item {
    .section-heading {
      font-size: 2.8rem;
      color: $color-blue-2;
      word-wrap: break-word;
      text-align: center;
      margin-bottom: 6rem;

      @include respond(mobile) {
        font-size: 2.4rem;
        margin-bottom: 5rem;
      }
    }
  }
}
</style>
