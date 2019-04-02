// 发送请求
import axios from 'axios'
const Http = {}
Http.install = function (Vue, options) {

  axios.defaults.baseURL = "http://192.168.2.124/salestest"
  // 请求拦截器 -> 在发起请求之前 ->
  axios.interceptors.request.use(function (config) {
    // console.log("拦截器被触发---");

    // console.log(config);
    // config 1. headers 2. url
    // console.log(config); // rights/list

    if (config.url !== "login") {
      const AUTH_TOKEN = localStorage.getItem("token");
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      config.headers.Authorization = AUTH_TOKEN
    }


    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
    // console.log(111)
  });

  Vue.prototype.$http = axios
}
export default Http
