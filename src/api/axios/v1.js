import axios from 'axios';
import cookie from 'react-cookies';

import { csrfTokenName } from '../../consts/consts';

const baseUrlV1 = 'http://kewei.sh.intel.com:8000/api/v1';

const instanceV1 = axios.create({
  timeout: 10000,
  baseURL: baseUrlV1,
  withCredentials: true,
});

instanceV1.defaults.headers.post['Content-Type'] = 'application/json';

instanceV1.interceptors.request.use(
  (config) => {
    // v1/hello does not need X-Token
    console.log('config', config);
    if (config.url === 'hello') {
      return config;
    }
    const xTokenInCookie = cookie.load(csrfTokenName);
    console.log('xTokenInCookie :>> ', xTokenInCookie);
    if (xTokenInCookie) {
      config.headers[csrfTokenName] = xTokenInCookie;
      return config;
    }
    alert('X-Token is missing, please try refreshing page');
  },
  (error) => Promise.reject(error),
);

export const getV1 = (url, params, config = {}) =>
  new Promise((resolve, reject) => {
    instanceV1
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

export const postV1 = (url, data, config = {}) =>
  new Promise((resolve, reject) => {
    instanceV1
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
