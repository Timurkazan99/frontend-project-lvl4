import { $authHost } from './index';

export const fetchData = async () => {
  const { data } = await $authHost.get('/api/v1/data');
  return data;
};
