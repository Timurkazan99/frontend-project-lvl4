import { $host } from './index.js';

const sendRequestTo = async (username, password, url) => {
  const { data } = await $host.post(url, { username, password });
  localStorage.setItem('token', data.token);
  return data;
};

export const registration = (username, password) => sendRequestTo(username, password, 'api/v1/signup');

export const login = (username, password) => sendRequestTo(username, password, 'api/v1/login');
