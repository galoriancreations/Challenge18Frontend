export const actions = {
    async nuxtServerInit({ dispatch, getters }, { error }) {
        dispatch("checkAuth");
        try {
            await Promise.all([
                getters.isAuth && dispatch("updateUser"),
                dispatch("loadTemplates", getters.isAuth),
                dispatch("results/loadResults"),
                dispatch("players/loadPlayers")
            ]);
            if (getters.isAdmin) {
                await dispatch("admin/loadData");
            }
        } catch (err) {
            error(err);
        }
    }
};