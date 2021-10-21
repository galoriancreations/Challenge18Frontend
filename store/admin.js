export const state = () => ({
    users: [],
    templates: []
});

export const mutations = {
    setUsers(state, payload) {
        state.users = payload;
    },
    setTemplates(state, payload) {
        state.templates = payload;
    }
};

export const actions = {
    async loadData(context) {
        const actions = ["loadUsers", "loadTemplates", "loadChallenges"];
        await Promise.all(actions.map(action => context.dispatch(action)));
    },
    async loadUsers(context) {
        const users = await this.$axios.$post("/api", {
            getAllUsers: true
        });
        context.commit("setUsers", users);
    },
    async loadTemplates(context) {
        const templates = await this.$axios.$post("/xapi", {
            getAllTemplates: true
        });
        context.commit("setTemplates", templates);
    },
    async loadChallenges(context) {

    }
};

export const getters = {
    users(state) {
        return state.users;
    },
    templates(state) {
        return state.templates;
    }
};