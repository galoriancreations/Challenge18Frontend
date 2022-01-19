import temp from "~/temp.json";

export const state = () => ({
  latest: temp
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
