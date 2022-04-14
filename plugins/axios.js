import https from "https";

export default ({ $axios }) => {
  // $axios.defaults.timeout = 15000;
  $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false });
};
