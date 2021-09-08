<template>
  <DashboardSection title="Public Templates" class="public-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>
        Public templates will appear here. These templates will be available for
        all users.
      </p>
      <p>Click below to create a new public template.</p>
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
      <ActionButton type="add" color="blue" @click="editTemplate(null)" />
    </template>
    <BaseSpinner v-if="loading" />
  </DashboardSection>
</template>

<script>
import templatesTable from "../../mixins/templates-table";

export default {
  mixins: [templatesTable],
  computed: {
    templates() {
      return this.$store.getters.templates.filter(
        template => template.isPublic
      );
    }
  }
};
</script>
