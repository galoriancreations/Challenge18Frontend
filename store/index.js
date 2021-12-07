export const actions = {
  async nuxtServerInit({ dispatch, getters }, { route, error }) {
    dispatch("checkAuth");
    try {
      await Promise.all([
        getters.isAuth && dispatch("updateUser"),
        dispatch("loadTemplates", getters.isAuth),
        route.name === "index" && dispatch("challenges/loadLatest")
      ]);
      if (getters.isAdmin && route.name === "dashboard") {
        await dispatch("admin/loadData");
      }
    } catch (err) {
      error(err);
    }
  }
};
