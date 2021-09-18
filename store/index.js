export const actions = {
    async nuxtServerInit({ dispatch, getters }, { error }) {
        dispatch("checkAuth");
        try {
            await Promise.all([
                getters.isAuth && dispatch("updateUser"),
                getters.isAuth && dispatch("loadTemplates"),
                dispatch("results/loadResults"),
                dispatch("players/loadPlayers")
            ]);
        } catch (err) {
            error(err);
        }
    }
};