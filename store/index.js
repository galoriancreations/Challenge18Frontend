export const actions = {
  async nuxtServerInit({ dispatch, getters }, { route, error }) {
    dispatch("checkAuth");
    try {
      await Promise.all([
        dispatch("loadTemplates", getters.isAuth),
        (route.name === "dashboard" && getters.isAuth) && dispatch("updateUser")
      ]);
    } catch (err) {
      error(err);
    }
  }
};
