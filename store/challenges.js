export const state = () => ({
  latest: require("../temp.json")
});

export const mutations = {
  setlatest(state, payload) {
    state.latest = payload;
  }
};

export const actions = {
  async loadLatest(context) {
    const challenges = await this.$axios.$post("/api", {
      getLatestChallenges: true
    });
    context.commit("setlatest", challenges);
  }
};

export const getters = {
  latest(state) {
    return state.latest;
  }
};
