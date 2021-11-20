export const actions = {
    async nuxtServerInit({ dispatch, getters }, { error }) {
        dispatch("checkAuth");
        try {
            await Promise.all([
                getters.isAuth && dispatch("updateUser"),
                dispatch("loadTemplates", getters.isAuth),
                dispatch("challenges/loadUpcoming")
            ]);
            if (getters.isAdmin) {
                await dispatch("admin/loadData");
            }
        } catch (err) {
            error(err);
        }
    }
};