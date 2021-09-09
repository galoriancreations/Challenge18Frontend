<template>
  <DashboardSection title="My Templates" class="my-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>Private templates you created will appear here.</p>
      <p>Click the button below to create a new template.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <v-card :elevation="1">
        <v-data-table :headers="headers" :items="items">
          <template v-slot:[`item.clone`]="{ item }">
            <DashboardButton type="clone" @click="item.clone" />
          </template>
          <template v-slot:[`item.edit`]="{ item }">
            <DashboardButton type="edit" @click="item.edit" />
          </template>
          <template v-slot:[`item.delete`]="{ item }">
            <DashboardButton type="delete" @click="item.delete" />
          </template>
        </v-data-table>
      </v-card>
    </div>
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
import dashboardModal from "../../mixins/dashboard-modal";

export default {
  mixins: [templatesTable, dashboardModal],
  computed: {
    templates() {
      return this.$store.getters.templates.filter(
        template => !template.isPublic
      );
    }
  }
};
</script>
