let logoutTimer;

export const namespaced = false;

export const state = () => ({
    user: null,
    token: null,
    templates: {},
    selectedTemplate: null
});

export const mutations = {
    setUser(state, payload) {
        state.user = payload.user;
        state.token = payload.token;
    },
    removeUser(state) {
        state.user = null;
        state.token = null;
    },
    updateUser(state, payload) {
        state.user = payload;
    },
    setTemplates(state, payload) {
        state.templates = payload;
    },
    setSelectedTemplate(state, payload) {
        state.selectedTemplate = payload;
    }
};

export const actions = {
    async auth(context, { mode, data }) {
        const authData = await this.$axios.$post("/api", { [mode]: data });
        const { access_token: token, user, exp } = authData;
        context.dispatch("setAxiosDefaults", { token, user });
        await context.dispatch("loadTemplates", { user });
        context.commit("setUser", { user, token });

        this.$cookies.set("userId", user.id);
        this.$cookies.set("token", token);
        this.$cookies.set("expirationDate", new Date(exp));

        const timeLeft = new Date(exp).getTime() - Date.now();
        logoutTimer = setTimeout(() => context.dispatch("logout"), timeLeft);
    },
    checkAuth(context) {
        const { userId, token, expirationDate } = this.$cookies.getAll();
        if (!userId || !token || !expirationDate) return;
        const timeLeft = new Date(expirationDate).getTime() - Date.now();
        if (timeLeft <= 0) {
            return context.dispatch("logout");
        }

        if (process.server) {
            context.commit("setUser", { user: { id: userId }, token });
            context.dispatch("setAxiosDefaults", { token, user });
        } else {
            clearTimeout(logoutTimer);
            logoutTimer = setTimeout(() => context.dispatch("logout"), timeLeft);
        }
    },
    setAxiosDefaults(_, { token, user }) {
        this.$axios.setToken(token, "Bearer");
        this.$axios.defaults.transformRequest = [
            data => ({ ...data, userID: user.id })
        ];
    },
    logout(context) {
        context.commit("removeUser");
        this.$axios.setToken(false);
        this.$cookies.removeAll();
        clearTimeout(logoutTimer);
    },
    async updateUser(context, userData = {}) {
        const { user: { id } } = context.getters;
        const { user } = await this.$axios.$post("/xapi",
            { userID: id, editProfile: userData }
        );
        context.commit("updateUser", user);
    },
    async loadTemplates(context, authData) {
        const { user } = authData || context.getters;
        const { templates } = await this.$axios.$post("/xapi",
            { userID: user.id, getTemplateNames: true }
        );
        context.commit("setTemplates", templates);
    },
    selectTemplate(context, template) {
        context.commit("setSelectedTemplate", template);
        this.$cookies.remove("draftId");
    }
};

export const getters = {
    isAuth(state) {
        return !!state.token && !!state.user;
    },
    token(state) {
        return state.token;
    },
    user(state) {
        return state.user;
    },
    templates(state) {
        return state.templates;
    },
    selectedTemplate(state) {
        return state.selectedTemplate;
    }
};