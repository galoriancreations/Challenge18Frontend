export const state = () => ({
    results: {}
});

export const mutations = {
    setResults(state, payload) {
        state.results = payload;
    }
};

export const actions = {
    async loadResults(context) {

    }
};

export const getters = {
    results(state) {
        return state.results;
    }
};