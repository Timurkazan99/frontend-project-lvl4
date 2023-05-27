import getMockAdapter from '../helpers/getMockAdapter.js';
import { $authHost } from '../../src/http/index';
import fetchData from '../../src/http/dataAPI.js';

const response = { messages: [], channels: [{ id: 1, name: 'general', removable: false }] };

describe('Загрузка данных', () => {
  beforeAll(() => {
    getMockAdapter($authHost, response);
  });

  it('Обычная', async () => {
    const data = await fetchData();
    expect(data).toEqual(response);
  });

  it('С левыми аргументами', async () => {
    const data = await fetchData({ data: { users: ['admin', 'Петя', 'Даня'] } });
    expect(data).toEqual(response);
  });
});
