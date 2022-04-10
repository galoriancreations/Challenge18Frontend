let logoutTimer;

export const namespaced = false;

export const state = () => ({
  user: null,
  token: null,
  templates: require("../temp2.json")
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
  setDrafts(state, payload) {
    state.user.drafts = payload;
  },
  setPlayers(state, payload) {
    state.user.players = payload;
  }
};

export const actions = {
  async auth(context, { mode, data }) {
    const authData = await this.$axios.$post("/api", { [mode]: data });
    const { access_token: token, user, exp } = authData;
    this.$axios.setToken(token, "Bearer");

    const isAdmin = user.isAdmin || user.accountType === "admin";
    await Promise.all([
      context.dispatch("loadTemplates"),
      isAdmin && context.dispatch("admin/loadData")
    ]);
    context.commit("setUser", { user, token });

    this.$cookies.set("userId", user._id);
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
      context.commit("setUser", { user: { _id: userId }, token });
      this.$axios.setToken(token, "Bearer");
    } else {
      clearTimeout(logoutTimer);
      logoutTimer = setTimeout(() => context.dispatch("logout"), timeLeft);
    }
  },
  logout(context) {
    context.commit("removeUser");
    this.$axios.setToken(false);
    if (process.client) {
      setTimeout(this.$cookies.removeAll, 1000);
      context.dispatch("loadTemplates", false);
    } else {
      this.$cookies.removeAll();
      clearTimeout(logoutTimer);
    }
  },
  async updateUser(context, data = {}) {
    const { user } = await this.$axios.$post("/xapi", { editProfile: data });
    context.commit("updateUser", user);
  },
  async loadTemplates(context, isAuth = true) {
    const endpoint = isAuth ? "/xapi" : "/api";
    const key = isAuth ? "getAvailableTemplates" : "getPublicTemplates";
    const { templates } = await this.$axios.$post(endpoint, { [key]: true });
    context.commit("setTemplates", templates);
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
  isAdmin({ user }) {
    return user?.accountType === "admin" || user?.isAdmin;
  },
  templates(state) {
    return state.templates;
  }
};
