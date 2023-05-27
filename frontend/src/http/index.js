import axios from 'axios';
import { URI } from '../utils/const.js';

const host = process.env.REACT_APP_HOST;
const baseURL = `${host}${URI}`;

const $host = axios.create({ baseURL });
const $authHost = axios.create({ baseURL });

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost,
};
