import axios from "axios";
//import { protocol, host, PORT } from "referals-table__col";

// const BASE_URL = process.env.REACT_APP_API_URL1 || `${protocol}://${host}:${PORT}`;

let axiosInstance = axios.create({
  // baseURL: 'https://vent-back-stage.herokuapp.com/'
  baseURL: "http://ventapi.customerdemourl.com/"
  //baseURL: "http://localhost:3000/"
});

axiosInstance.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token");
    if (token !== null) {
      config.headers.Authorization = token;
    }
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
