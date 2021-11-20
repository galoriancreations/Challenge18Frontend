export const state = () => ({
    upcoming: []
});

export const mutations = {
    setUpcoming(state, payload) {
        state.upcoming = payload;
    }
};

export const actions = {
    async loadUpcoming(context) {
        const challenges = await this.$axios.$post("/api", {
            getUpcomingChallenges: true
        });
        context.commit("setUpcoming", challenges);
    }
};

export const getters = {
    upcoming(state) {
        return state.upcoming;
    }
};