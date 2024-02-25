let logoutTimer;

export const namespaced = false;

export const state = () => ({
  user: null,
  token: null,
  templates: []
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
    const authData = await this.$axios.$post(`/users/${mode}`,data);
    const { access_token: token, user, exp } = authData;
    this.$axios.setToken(token, "Bearer");

    // const isAdmin = user.isAdmin || user.accountType === "admin";
    // await Promise.all([
    //   context.dispatch("loadTemplates"),
    //   isAdmin && context.dispatch("admin/loadData")
    // ]);
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

  // updateUser and loadTemplates runs together when i enter dashboard
  async updateUser(context, data) {
    // this is old version:
    // const { user } = await this.$axios.$post("/xapi", { editProfile: data });
    // this is new:
    // when entering dashboard data object must hold a editProfile key
    if (data == null) {
      data = { editProfile: {} };
    }
    // const { user } = await this.$axios.$post("/xapi", data);
    // connect post with data path
    const { user } = await this.$axios.$post("/users/editProfile", data);
    context.commit("updateUser", user);
  },
  async loadTemplates(context, isAuth = true) {
    // const endpoint = isAuth ? "/users/getAvailableTemplates" : "/users/getPublicTemplates";
    const endpoint = "/users/getAvailableTemplates";
    const { templates } = await this.$axios.$get(endpoint);
    
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
