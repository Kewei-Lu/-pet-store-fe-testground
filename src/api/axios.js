import axios from "axios";
import cookie from "react-cookies";
import { store } from "../state/app/store";
import { logout } from "../state/slices/userSlice";

let baseUrl = "http://kewei.sh.intel.com:8000/api/";

const instance = axios.create({
  timeout: 10000,
  baseURL: baseUrl,
  withCredentials: true,
});
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (config) => {
    const XTokenInCookie = cookie.load("X-Token");
    const jwtTokenInCookie = cookie.load("jwt-token");
    if (!config.skipToken) {
      if (XTokenInCookie) {
        config.headers["X-Token"] = XTokenInCookie;
      }
      if (jwtTokenInCookie) {
        config.headers["jwt-token"] = jwtTokenInCookie;
      }
      if (!config.headers["jwt-token"] && !config.headers["X-Token"]) {
        console.log("token expires or not logged in :>> ", config.url);
        alert("token expires or not logged in", config.url);
        store.dispatch(logout());
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response.data.code === 401) {
//       //token过期或没传token 需要重新登陆获取token
//     }
//     return Promise.reject(error);
//   }
// );

/* 统一封装get请求 */
// withCredentials 携带token
export const get = (url, params, config = { skipToken: false }) => {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
        ...config,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/* 统一封装post请求  */
export const post = (url, data, config = { skipToken: false }) => {
  return new Promise((resolve, reject) => {
    instance
      .post(url, data, {
        ...config,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
