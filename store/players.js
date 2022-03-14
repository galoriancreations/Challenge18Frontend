export const state = () => ({
  players: []
});

export const mutations = {
  setPlayers(state, payload) {
    state.players = payload;
  }
};

export const actions = {
  async loadPlayers(context) {}
};

export const getters = {
  players(state) {
    return state.players;
  }
};
