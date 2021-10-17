export const state = () => ({
    users: []
});

export const mutations = {
    setUsers(state, payload) {
        state.users = payload;
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

    },
    async loadChallenges(context) {

    }
};

export const getters = {
    users(state) {
        return state.users;
    }
};