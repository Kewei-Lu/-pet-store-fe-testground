import axios from "axios";
import cookie from "react-cookies";

let baseUrl = "http://kewei.sh.intel.com:8000/api/";

const instance = axios.create({
  timeout: 10000,
  baseURL: baseUrl,
});
instance.defaults.headers.post["Content-Type"] = "application/json";
// instance.interceptors.request.use(
//   (config) => {
//     const tokenInCookie = cookie.load("X-Token");
//     if (tokenInCookie) {
//       config.headers["X-Token"] = tokenInCookie;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Server.interceptors.request.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     if (error.response.data.code == 401) {
//       //token过期或没传token 需要重新登陆获取token
//     }
//     return Promise.reject(error);
//   }
// );

/* 统一封装get请求 */
// withCredentials 携带token
export const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "get",
      url,
      params,
      ...config,
      withCredentials: true,
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
export const post = (url, data, config = {}) => {
  return new Promise((resolve, reject) => {
    instance({
      method: "post",
      url,
      data,
      withCredentials: true,
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
