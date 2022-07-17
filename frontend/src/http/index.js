import axios from 'axios';

const $host = axios.create({
});

const $authHost = axios.create({
});

const authInterceptor = (config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`; // eslint-disable-line no-param-reassign
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export {
  $host,
  $authHost,
};
