<template>
  <DashboardSection title="My Templates" class="my-templates">
    <div v-if="!hasTemplates" class="my-challenges__empty">
      <p>Private templates you created will appear here.</p>
      <p>Click the button below to create a new template.</p>
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
      <ActionButton type="add" color="blue" @click="selectTemplate" />
    </template>
  </DashboardSection>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        { field: "id", label: "ID", sortable: false },
        { field: "name", label: "Name", sortable: false },
        { field: "language", label: "Language", sortable: false }
      ],
      scrollbar: null,
      fixedHeader: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    templates() {
      return this.$store.getters.templates.filter(
        template => !template.isPublic
      );
    },
    hasTemplates() {
      return this.templates.length > 0;
    },
    table() {
      return this.$el.querySelector(".vgt-responsive");
    }
  },
  methods: {
    manageTableScrollbar() {
      if (this.hasChallenges) {
        this.scrollbar = Scrollbar.init(this.table);
      }
    },
    adjustTableHeader() {
      this.fixedHeader = window.innerWidth > 1000;
    },
    selectTemplate(templateId) {
      if (templateId) {
        this.$cookies.set("selectedTemplate", templateId);
      } else {
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("challengeId");
      this.$cookies.remove("draftId");
      this.$router.push({
        path: "/challenge-editor",
        query: { templateOnly: true }
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.manageTableScrollbar();
      this.adjustTableHeader();
    }, 100);
    window.addEventListener("resize", this.adjustTableHeader);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.manageTableHeader);
  }
};
</script>
