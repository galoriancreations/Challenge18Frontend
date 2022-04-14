<template>
  <DashboardSection
    title="All Templates"
    class="all-templates"
    id="all-templates"
  >
    <BaseSpinner v-if="fetching" class="initial-spinner" />
    <ErrorMessage v-else-if="error" :error="error" />
    <DashboardTable
      v-else
      v-model="selected"
      :headers="headers"
      :items="items"
    />
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import templatesTable from "~/mixins/templates-table";

export default {
  name: "all-templates",
  mixins: [templatesTable],
  data() {
    return {
      fetching: true,
      error: null
    };
  },
  computed: {
    templates() {
      return this.$store.getters["admin/templates"];
    }
  },
  async mounted() {
    try {
      await this.$store.dispatch("admin/loadTemplates");
      this.fetching = false;
    } catch (error) {
      this.error = error;
    }
  }
};
</script>
