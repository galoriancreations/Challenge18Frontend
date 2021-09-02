import https from "https";

export default ({ $axios }, inject) => {
    $axios.onRequest(config => console.log(config))
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const setAxiosDefaults = (token, userID) => {
        $axios.setToken(token, "Bearer");
        // $axios.defaults.transformRequest = [
        //     data => ({ ...data, userID })
        // ];
    };
    const clearAxiosDefaults = () => {
        $axios.setToken(false);
        // $axios.defaults.transformRequest = [];
    };
    inject("setAxiosDefaults", setAxiosDefaults);
    inject("clearAxiosDefaults", clearAxiosDefaults);
};