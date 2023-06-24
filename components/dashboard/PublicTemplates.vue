<template>
  <DashboardSection
    title="Public Templates"
    class="public-templates"
    id="public-templates"
  >
    <DashboardTable v-model="selected" :headers="headers" :items="items" />
    <template slot="button">
      <ActionButton type="add" color="blue" @click="showModal = true" />
    </template>
    <template slot="modal">
      <CreateTemplate :active="showModal" />
    </template>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import templatesTable from "~/mixins/templates-table";
import popupModal from "~/mixins/popup-modal";

export default {
  name: "public-templates",
  mixins: [templatesTable, popupModal],
  data() {
    return {
      name:"public-templates"
    };
  },
  computed: {
    templates() {
      return this.$store.getters.templates.filter(
        template => template.isPublic
      );
    }
  }
};
</script>
