<template>
  <DashboardSection
    title="All Templates"
    class="all-templates"
    id="all-templates"
  >
    <DashboardTable v-model="selected" :headers="headers" :items="items" />
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import templatesTable from "~/mixins/templates-table";

export default {
  name: "all-templates",
  mixins: [templatesTable],
  computed: {
    templates() {
      return this.$store.getters["admin/templates"];
    }
  }
};
</script>
