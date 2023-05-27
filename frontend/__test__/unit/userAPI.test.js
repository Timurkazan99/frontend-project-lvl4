import { registration, login } from '../../src/http/userAPI.js';
import getMockAdapter from '../helpers/getMockAdapter.js';
import { $host } from '../../src/http/index';

const response = { token: 'jwtToken' };

const mapCases = [
  { name: 'Регистрация', func: registration },
  { name: 'Авторизация', func: login },
];

describe('User Api', () => {
  beforeAll(() => {
    getMockAdapter($host, response);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each(mapCases)('$name', async ({ func }) => {
    const data = await func('user', 'password');
    expect(data).toEqual(response);
    expect(localStorage.setItem).toBeCalledWith('token', response.token);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});
