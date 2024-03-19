export default {
  inject: ["addNotification", "setConfirmModal"],
  data() {
    const headers = [
      { text: "Name", value: "name" },
      { text: "Language", value: "language" },
      { text: "Edit", value: "edit", sortable: false }
    ];
    if (this.$options.name === "all-templates") {
      headers.splice(2, 0, { text: "Creator", value: "creator" });
      headers.splice(3, 0, { text: "Type", value: "type" });
    } else {
      headers.splice(2, 0, { text: "Clone", value: "clone", sortable: false });
      headers.splice(4, 0, {
        text: "Simulate",
        value: "simulate",
        sortable: false
      });
    }
    return {
      headers,
      selected: [],
      loading: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    isAdmin() {
      return this.$store.getters.isAdmin;
    },
    items() {
      return this.templates.map(template => ({
        ...template,
        name: template.name || "(Unnamed)",
        type: template.isPublic ? "Public" : "Private",
        newChallenge: () => this.createChallenge(template._id),
        clone: () => this.cloneTemplate(template._id),
        edit: () => this.editTemplate(template._id),
        simulate: () => this.simulateTemplate(template)
      }));
    },
    hasTemplates() {
      return this.templates.length > 0;
    }
  },
  methods: {
    createChallenge(templateId) {
      this.editTemplate(templateId, true);
    },
    async cloneTemplate(templateId) {
      this.loading = true;
      const newTemplate = await this.$axios.$post("/clone", {
        cloneTemplate: templateId
      });
      const { name: templateName } = newTemplate.newTemplate;
      this.$store.commit(
        "setTemplates",
        this.$store.getters.templates.concat(newTemplate)
      );
      if (this.isAdmin) {
        this.$store.commit("admin/setTemplates", [
          newTemplate,
          ...this.$store.getters["admin/templates"]
        ]);
      }
      await this.$store.dispatch("updateUser");
      this.addNotification(
        `Created new template: <strong>${templateName}</strong>.`
      );
      this.loading = false;
    },
    editTemplate(templateId, newChallenge = false) {
      if (templateId) {
        this.$cookies.set("selectedTemplate", templateId);
      } else {
        this.$cookies.remove("selectedTemplate");
      }
      this.$cookies.remove("challengeId");
      this.$cookies.remove("draftId");
      const redirect = { path: "/editor" };
      // if its a template only:
      if (!newChallenge) {
        redirect.query = { templateOnly: true };
      }
      this.$router.push(redirect);
    },
    async simulateTemplate(template) {
      this.loading = true;
      const { invite } = await this.$axios.$post("/xapi", {
        simulateChallenge: template._id
      });
      this.addNotification(
        `Created simulation WhatsApp group for template: <strong>${template.name}</strong>.
                Group link: <strong>${invite}</strong>.`
      );
      this.loading = false;
      window.open(invite, "_blank");
    },
    deleteTemplate(template) {
      this.setConfirmModal(
        "Are you sure you want to delete this template? This action is irreversible.",
        async () => {
          this.loading = true;
          await this.$axios.$post("/editor/deleteTemplate", {
            templateId: template._id,
            isPublic: template.isPublic
          });
          const filter = item => item._id !== template._id;
          this.filterTemplates(filter);
          await this.$store.dispatch("updateUser");
          this.addNotification(
            `Successfully deleted template: <strong>${template.name ||
              "(Unnamed)"}</strong>.`
          );
          this.loading = false;
          this.selected = this.selected.filter(
            selection => selection._id !== template._id
          );
        }
      );
    },
    deleteSelected() {
      const selections = [...this.selected];
      if (selections.length === 1) {
        return this.deleteTemplate(selections[0]);
      }
      this.setConfirmModal(
        `Are you sure you want to delete these ${selections.length} templates? This action is irreversible.`,
        async () => {
          this.loading = true;

          
          await this.$axios.$post('/editor/deleteTemplate', {
            templateIds: selections.map((selection) => selection._id),
            isPublic: selections.map((selection) => selection.isPublic),
          });

          // delete from store using filterTemplates method:
          const filter = item =>
            !selections.map(selection => selection._id).includes(item._id);
          this.filterTemplates(filter);
          this.addNotification(
            `Successfully deleted <strong>${selections.length} templates</strong>.`
          );
          this.loading = false;
          this.selected = [];
        }
      );
    },
    filterTemplates(filter) {
      this.$store.commit(
        "setTemplates",
        this.$store.getters.templates.filter(filter)
      );
      if (this.isAdmin) {
        this.$store.commit(
          "admin/setTemplates",
          this.$store.getters["admin/templates"].filter(filter)
        );
      }
    }
  },
  provide() {
    return {
      deleteSelected: this.deleteSelected
    };
  }
};
