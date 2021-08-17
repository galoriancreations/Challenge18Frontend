export default ({ $axios }, inject) => {
    const setAxiosDefaults = (token, userID) => {
        $axios.setToken(token, "Bearer");
        $axios.defaults.transformRequest = [
            data => ({ ...data, userID })
        ];
    };
    const clearAxiosDefaults = () => {
        $axios.setToken(false);
        $axios.defaults.transformRequest = [];
    };
    inject("setAxiosDefaults", setAxiosDefaults);
    inject("clearAxiosDefaults", clearAxiosDefaults);
};