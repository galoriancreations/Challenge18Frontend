import { redirects } from "../assets/util/options";

export default ({ store, route, redirect }) => {
    for (let item of redirects) {
        if (route.path === item.from) {
            return redirect(item.to);
        }
    }
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
