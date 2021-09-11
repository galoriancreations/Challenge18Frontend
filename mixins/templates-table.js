export default {
    inject: ["setConfirmModal"],
    data() {
        return {
            headers: [
                { text: "Name", value: "name" },
                { text: "Language", value: "language" },
                { text: "Clone", value: "clone", sortable: false },
                { text: "Edit", value: "edit", sortable: false },
                { text: "Delete", value: "delete", sortable: false }
            ],
            loading: false
        };
    },
    computed: {
        items() {
            return this.templates.map(template => ({
                ...template,
                clone: () => this.cloneTemplate(template),
                edit: () => this.editTemplate(template.id),
                delete: () => this.deleteTemplate(template)
            }));
        },
        hasTemplates() {
            return this.templates.length > 0;
        }
    },
    methods: {
        async cloneTemplate(template) {
            this.loading = true;
            await this.$axios.$post("/xapi", {
                saveTemplate: {
                    templateId: null,
                    templateData: {
                        ...template,
                        name: `${template.name} (copy)`
                    },
                    draftId: null,
                    finishEditing: false
                }
            });
            await this.$store.dispatch("loadTemplates");
            this.loading = false;
        },
        editTemplate(templateId) {
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
        },
        deleteTemplate(template) {
            this.setConfirmModal(
                "Are you sure you want to delete this template? This action is irreversible.",
                async () => {
                    this.loading = true;
                    const res = await this.$axios.$post("/xapi", {
                        deleteTemplate: {
                            templateId: template.id,
                            isPublic: template.isPublic
                        }
                    });
                    console.log(res)
                    await this.$store.dispatch("loadTemplates");
                    this.loading = false;
                }
            );
        }
    }
};