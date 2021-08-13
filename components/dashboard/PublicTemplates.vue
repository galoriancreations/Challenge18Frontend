<template>
  <DashboardSection title="Public Templates" class="public-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>
        Public challenge templates will appear here. These templates will be
        available for all organizations.
      </p>
      <p>Click below to create a new public template.</p>
    </div>
    <div v-else class="my-challenges__table-container">
      <vue-good-table
        class="results-table my-challenges__table"
        :columns="columns"
        :rows="templates"
        theme="polar-bear"
        max-height="46rem"
        :fixed-header="fixedHeader"
      />
    </div>
    <template slot="button">
      <ActionButton type="add" color="blue" @click="startNewTemplate" />
    </template>
  </DashboardSection>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { field: "id", label: "ID", sortable: false },
        { field: "title", label: "Title", sortable: false },
        { field: "language", label: "Language", sortable: false }
      ]
    };
  },
  computed: {
    templates() {
      return this.$store.getters.templates.filter(
        template => template.isPublic
      );
    },
    hasTemplates() {
      return !!this.templates.length;
    }
  },
  methods: {
    startNewTemplate() {
      this.$store.dispatch("selectTemplate", null);
      this.$router.push({
        path: "/challenge-editor",
        query: { templateOnly: true }
      });
    }
  }
};
</script>
