import {
    initialPreMessages,
    initialOptions,
    defaultDate
} from "~/assets/util/functions";

export default ({ app, store, $axios, error }, inject) => {
    inject("getEditorData", async () => {
        try {
            const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();
            const { user } = store.getters;

            if (draftId) {
                const draft = await $axios.$post("/xapi", {
                    getDraftData: draftId
                });
                return {
                    data: {
                        name: draft.name,
                        language: draft.language,
                        image: draft.image,
                        date: new Date(draft.date || defaultDate()),
                        preMessages: initialPreMessages(draft.preMessages),
                        options: initialOptions(draft.days),
                        isTemplatePublic: draft.isTemplatePublic,
                        allowTemplateCopies: draft.allowTemplateCopies
                    },
                    draftId,
                    templateId: draft.templateId
                };
            } else if (challengeId) {
                const challenge = await $axios.$post("/api", {
                    getChallengeData: challengeId
                });
                return {
                    data: {
                        name: challenge.name,
                        language: challenge.language,
                        image: challenge.image,
                        date: new Date(challenge.date || defaultDate()),
                        preMessages: initialPreMessages(challenge.preMessages),
                        options: initialOptions(challenge.days),
                        isTemplatePublic: challenge.isTemplatePublic,
                        allowTemplateCopies: challenge.allowTemplateCopies
                    },
                    draftId: null,
                    templateId: challenge.template
                };
            } else if (selectedTemplate) {
                const template = await $axios.$post("/xapi", {
                    getTemplateData: selectedTemplate
                });
                return {
                    data: {
                        name: template.name,
                        language: template.language,
                        image: template.image,
                        date: defaultDate(),
                        preMessages: initialPreMessages(template.preMessages),
                        options: initialOptions(template.days),
                        isTemplatePublic: template.isPublic,
                        allowTemplateCopies: template.allowCopies,
                    },
                    draftId: null,
                    templateId: template.id
                };
            } else {
                return {
                    data: {
                        name: "",
                        language: user?.language || "English",
                        image: null,
                        date: defaultDate(),
                        preMessages: initialPreMessages(),
                        options: initialOptions(),
                        isTemplatePublic: user?.accountType === "admin",
                        allowTemplateCopies: user?.accountType !== "admin"
                    },
                    draftId: null,
                    templateId: null
                };
            }
        } catch (err) {
            error(err);
        }
    });
};