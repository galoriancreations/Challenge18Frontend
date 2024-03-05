<template>
  <DashboardSection title="My Templates" class="my-templates" id="my-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>Private templates you created will appear here.</p>
      <p>Click the button below to create a new template.</p>
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
      <CreateTemplate :active="showModal" />
    </template>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import templatesTable from "../../mixins/templates-table";
import popupModal from "../../mixins/popup-modal";

export default {
  name: "my-templates",
  mixins: [templatesTable, popupModal],
  data() {
    return {
      name:"my-templates"
    };
  },
  computed: {
    templates() {
      return this.$store.getters.templates.filter(
        template => !template.isPublic
      );
    }
  }
};
</script>
