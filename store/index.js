export const actions = {
  async nuxtServerInit({ dispatch, getters }, { error }) {
    dispatch("checkAuth");
    // try {
    //   await Promise.all([
    //     getters.isAuth && dispatch("updateUser"),
    //     dispatch("loadTemplates", getters.isAuth)
    //   ]);
    // } catch (err) {
    //   error(err);
    // }
  }
};
