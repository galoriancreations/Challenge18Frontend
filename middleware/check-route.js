export default context => {
    const { store, route, redirect } = context;
    if (!route.meta?.length) return;
    const [{ requiresAuth, forLoggingIn }] = route.meta;
    const { isAuth } = store.getters;
    if (requiresAuth && !isAuth) {
        redirect({ path: "/login", query: { redirect: route.name } });
    } else if (forLoggingIn && isAuth) {
        redirect("/dashboard");
    }
};
