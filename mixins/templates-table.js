export default {
    inject: ["addNotification", "setConfirmModal"],
    data() {
        return {
            selected: [],
            loading: false
        };
    },
    computed: {
        user() {
            return this.$store.getters.user;
        },
        headers() {
            const headers = [
                { text: "Name", value: "name" },
                { text: "Language", value: "language" },
                { text: "Clone", value: "clone", sortable: false },
                { text: "Edit", value: "edit", sortable: false },
                { text: "Delete", value: "delete", sortable: false }
            ];
            if (this.$options.name === "all-templates") {
                headers.splice(2, 0, { text: "Creator", value: "creator" });
            }
            return headers;
        },
        items() {
            return this.templates.map(template => ({
                ...template,
                name: template.name || "(Unnamed)",
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
                        name: `${template.name || "Unnamed"} (copy)`,
                        isPublic: template.isPublic && this.user.accountType === "admin"
                    },
                    draftId: null,
                    finishEditing: false
                }
            });
            await this.$store.dispatch("loadTemplates");
            this.addNotification(
                `Created new template: <strong>${template.name || "Unnamed"} (copy)</strong>.`
            );
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
                path: "/editor",
                query: { templateOnly: true }
            });
        },
        deleteTemplate(template) {
            this.setConfirmModal(
                "Are you sure you want to delete this template? This action is irreversible.",
                async () => {
                    this.loading = true;
                    await this.$axios.$post("/xapi", {
                        deleteTemplate: {
                            templateId: template.id,
                            isPublic: template.isPublic
                        }
                    });
                    // this.$store.commit(
                    //     "setTemplates",
                    //     this.$store.getters.templates.filter(item => item.id !== template.id)
                    // );
                    await this.$store.dispatch("loadTemplates");
                    this.addNotification(
                        `Successfully deleted template: <strong>${template.name || "(Unnamed)"}</strong>.`
                    );
                    this.loading = false;
                    this.selected = this.selected.filter(
                        selection => selection.id !== template.id
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
                    const requests = selections.map(template =>
                        this.$axios.$post("/xapi", {
                            deleteTemplate: {
                                templateId: template.id,
                                isPublic: template.isPublic
                            }
                        })
                    );
                    await Promise.all(requests);
                    // this.$store.commit(
                    //     "setTemplates",
                    //     this.$store.getters.templates.filter(
                    //         item =>
                    //             !selections.map(selection => selection.id).includes(item.id)
                    //     )
                    // );
                    await this.$store.dispatch("loadTemplates");
                    this.addNotification(
                        `Successfully deleted <strong>${selections.length} templates</strong>.`
                    );
                    this.loading = false;
                    this.selected = [];
                }
            );
        }
    },
    provide() {
        return {
            deleteSelected: this.deleteSelected
        }
    }
};