import axios from 'axios';
import cookie from 'react-cookies';

import { accessTokenName, csrfTokenName, refreshTokenName } from '../../consts/consts';
import { store } from '../../state/app/store';
import { logout } from '../../state/slices/userSlice';

const baseUrlV2 = 'http://kewei.sh.intel.com:8000/api/v2';

const instanceV2 = axios.create({
  timeout: 10000,
  baseURL: baseUrlV2,
  withCredentials: true,
});

instanceV2.defaults.headers.post['Content-Type'] = 'application/json';

instanceV2.interceptors.request.use(
  (config) => {
    const refreshTokenInCookie = cookie.load(refreshTokenName);
    const accessTokenInCookie = cookie.load(accessTokenName);
    // TODO Re-fetch access token after expires
    if (refreshTokenInCookie) {
    } else {
      alert('Refresh token expires, please login again');
      store.dispatch(logout());
      return;
    }
    if (accessTokenInCookie) {
      config.headers[accessTokenName] = accessTokenInCookie;
      return config;
    }
    // alert('Access token expires, please login again');
    store.dispatch(logout());
  },
  (error) => Promise.reject(error),
);

export const getV2 = (url, params, config = {}) =>
  new Promise((resolve, reject) => {
    instanceV2
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

export const postV2 = (url, data, config = {}) =>
  new Promise((resolve, reject) => {
    instanceV2
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
