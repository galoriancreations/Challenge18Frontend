export const state = () => ({
    users: []
});

export const mutations = {
    setUsers(state, payload) {
        state.users = payload;
    }
};

export const actions = {
    async loadUsers(context) {
        const users = await this.$axios.$post("/api", {
            getAllUsers: true
        });
        context.commit("setUsers", users);
    }
};

export const getters = {
    users(state) {
        return state.users;
    }
};