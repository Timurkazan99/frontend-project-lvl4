import { $authHost } from './index';

const fetchData = async () => {
  const { data } = await $authHost.get('/api/v1/data');
  return data;
};

export default fetchData;
