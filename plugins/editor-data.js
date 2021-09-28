import {
    initialPreMessages,
    initialOptions,
    defaultDate
} from "~/assets/util/functions";

export default ({ app, store, $axios, error }, inject) => {
    inject("getEditorData", async () => {
        if (process.server) {
            return {
                name: null,
                language: null,
                image: null,
                date: null,
                preMessages: [],
                options: [],
                draftId: null,
                isTemplatePublic: null,
                allowTemplateCopies: null,
                templateId: null,
                loading: true
            };
        }
        try {
            const { draftId, challengeId, selectedTemplate } = app.$cookies.getAll();
            const { user } = store.getters;

            if (draftId) {
                const draft = await $axios.$post("/xapi", {
                    getDraftData: draftId
                });
                return {
                    name: draft.name,
                    language: draft.language,
                    image: draft.image,
                    date: new Date(draft.date || defaultDate()),
                    preMessages: initialPreMessages(draft.preMessages),
                    options: initialOptions(draft.days),
                    draftId,
                    isTemplatePublic: draft.isTemplatePublic,
                    allowTemplateCopies: draft.allowTemplateCopies,
                    templateId: draft.templateId,
                    loading: false
                };
            } else if (challengeId) {
                const challenge = await $axios.$post("/api", {
                    getChallengeData: challengeId
                });
                return {
                    name: challenge.name,
                    language: challenge.language,
                    image: challenge.image,
                    date: new Date(challenge.date || defaultDate()),
                    preMessages: initialPreMessages(challenge.preMessages),
                    options: initialOptions(challenge.days),
                    draftId: null,
                    isTemplatePublic: challenge.isTemplatePublic,
                    allowTemplateCopies: challenge.allowTemplateCopies,
                    templateId: challenge.template,
                    loading: false
                };
            } else if (selectedTemplate) {
                const template = await $axios.$post("/xapi", {
                    getTemplateData: selectedTemplate
                });
                return {
                    name: template.name,
                    language: template.language,
                    image: template.image,
                    date: defaultDate(),
                    preMessages: initialPreMessages(template.preMessages),
                    options: initialOptions(template.days),
                    draftId: null,
                    isTemplatePublic: template.isPublic,
                    allowTemplateCopies: template.allowCopies,
                    templateId: template.id,
                    loading: false
                };
            } else {
                return {
                    name: "",
                    language: user?.language || "English",
                    image: null,
                    date: defaultDate(),
                    preMessages: initialPreMessages(),
                    options: initialOptions(),
                    draftId: null,
                    isTemplatePublic: user?.accountType === "admin",
                    allowTemplateCopies: user?.accountType !== "admin",
                    templateId: null,
                    loading: false
                };
            }
        } catch (err) {
            error(err);
        }
    });
};