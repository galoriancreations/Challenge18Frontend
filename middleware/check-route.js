export default ({ store, route, redirect }) => {
    if (!route.meta?.length) return;
    const [{ requiresAuth, forLoggingIn, forOrganizations }] = route.meta;
    const { isAuth, user } = store.getters;
    if (requiresAuth && !isAuth) {
        redirect("/login");
    } else if (forLoggingIn && isAuth) {
        redirect("/dashboard");
    } else if (forOrganizations && user?.accountType === "individual") {
        redirect("/");
    }
};
