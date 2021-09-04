<template>
  <DashboardSection title="My Drafts" class="my-drafts">
    <div v-if="!hasDrafts" class="my-challenges__empty">
      <p>
        Unpublished drafts of your challenges will appear here.
      </p>
    </div>
    <div v-else class="my-challenges__table-container">
      <vue-good-table
        class="results-table my-challenges__table"
        :columns="columns"
        :rows="drafts"
        theme="polar-bear"
        max-height="46rem"
        :fixed-header="fixedHeader"
      />
    </div>
  </DashboardSection>
</template>

<script>
import { dataArrayFromObject } from "../../assets/util/functions";

export default {
  data() {
    return {
      columns: [
        { field: "id", label: "ID", sortable: false },
        { field: "name", label: "Name", sortable: false },
        { field: "language", label: "Language", sortable: false }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    drafts() {
      return dataArrayFromObject(this.user.drafts);
    },
    hasDrafts() {
      return this.user?.drafts && this.drafts?.length > 0;
    }
  }
};
</script>
