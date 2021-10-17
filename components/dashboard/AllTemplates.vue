<template>
  <DashboardSection
    title="All Templates"
    class="all-templates"
    id="all-templates"
  >
    <div class="my-challenges__table-container">
      <v-app>
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="items"
          show-select
          class="elevation-2"
        >
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
      </v-app>
      <DeleteSelectedButton :disabled="!selected.length" />
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
import templatesTable from "~/mixins/templates-table";
import popupModal from "~/mixins/popup-modal";

export default {
  name: "all-templates",
  mixins: [templatesTable, popupModal],
  computed: {
    templates() {
      return this.$store.getters["admin/templates"];
    }
  }
};
</script>
