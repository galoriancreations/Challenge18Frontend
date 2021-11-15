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
            headers.splice(4, 0, { text: "Simulate", value: "simulate", sortable: false });
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
        items() {
            return this.templates.map(template => ({
                ...template,
                name: template.name || "(Unnamed)",
                type: template.isPublic ? "Public" : "Private",
                newChallenge: () => this.createChallenge(template.id),
                clone: () => this.cloneTemplate(template.id),
                edit: () => this.editTemplate(template.id),
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
            const template = await this.$axios.$post("/xapi", {
                getTemplateData: templateId
            });
            const newTemplate = {
                ...template,
                name: `${template.name || "Unnamed"} (copy)`,
                isPublic: template.isPublic && this.user.accountType === "admin"
            };
            const { templateId: newId } = await this.$axios.$post("/xapi", {
                saveTemplate: {
                    templateId: null,
                    templateData: newTemplate,
                    draftId: null,
                    finishEditing: false
                }
            });
            newTemplate.id = newId;
            this.$store.commit(
                "setTemplates",
                this.$store.getters.templates.concat(newTemplate)
            );
            this.addNotification(
                `Created new template: <strong>${newTemplate.name}</strong>.`
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
            if (!newChallenge) {
                redirect.query = { templateOnly: true };
            }
            this.$router.push(redirect);
        },
        async simulateTemplate(template) {
            this.loading = true;
            const { invite } = await this.$axios.$post("/xapi", {
                simulateChallenge: template.id
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
                    // const updatedTemplates = this.$store.getters.templates.filter(item =>
                    //     !selections.map(selection => selection.id).includes(item.id)
                    // );
                    // this.$store.commit("setTemplates", updatedTemplates);
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