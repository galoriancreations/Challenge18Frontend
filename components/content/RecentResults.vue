<template>
  <section class="recent-results">
    <SectionHeading>Recent Results</SectionHeading>
    <BaseSpinner v-if="loading" />
    <ErrorMessage v-else-if="error" :error="error" />
    <div v-else class="recent-results__content">
      <vue-good-table
        class="results-table"
        :columns="columns"
        :rows="rows"
        theme="polar-bear"
      />
      <BaseButton link="/scores" variant="blue" class="view-all-button">
        View All
      </BaseButton>
    </div>
  </section>
</template>

<script>
import { challengesArray } from "../../assets/util/functions";

export default {
  data() {
    return {
      columns: [
        {
          label: "School/Org",
          field: "school1",
          sortable: false
        },
        {
          label: "Score",
          field: "score1",
          sortable: false
        },
        {
          label: "Total Score",
          field: "total",
          thClass: "total-column",
          tdClass: "total-column"
        },
        {
          label: "Score",
          field: "score2",
          sortable: false
        },
        {
          label: "School/Org",
          field: "school2",
          sortable: false
        }
      ]
    };
  },
  computed: {
    results() {
      return this.$store.getters["results/results"];
    },
    loading() {
      return this.$store.getters["results/loading"];
    },
    error() {
      return this.$store.getters["results/error"];
    },
    rows() {
      return challengesArray(this.results);
    }
  }
};
</script>
