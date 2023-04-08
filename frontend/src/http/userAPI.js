import { $host } from './index';

const sendRequestTo = async (username, password, url) => {
  const { data } = await $host.post(url, { username, password });
  localStorage.setItem('token', data.token);
  return data;
}

export const registration = async (username, password) => {
  return await sendRequestTo(username, password, 'api/v1/signup');
};

export const login = async (username, password) => {
  return await sendRequestTo(username, password, 'api/v1/login');
};
