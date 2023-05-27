import { $authHost } from './index.js';

const fetchData = async () => {
  const { data } = await $authHost.get('/api/v1/data');
  return data;
};

export default fetchData;
