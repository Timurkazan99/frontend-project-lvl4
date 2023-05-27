import { $host, $authHost } from '../../src/http/index';
import getMockAdapter from '../helpers/getMockAdapter.js';

const token = 'jwtToken';
const host = process.env.REACT_APP_HOST;
const uri = process.env.REACT_APP_URI;
const baseURL = `${host}${uri}`;

const mapCases = [
  {
    name: 'С авторизацией',
    host: $authHost,
    interceptors: 1,
    authorization: 'toBe',
    toBe: `Bearer ${token}`,
  },
  {
    name: 'Без авторизацией',
    host: $host,
    interceptors: 0,
    authorization: 'toBeUndefined',
    toBe: null,
  },
];

describe('Проверка хостов', () => {
  beforeEach(() => {
    localStorage.getItem.mockReturnValue(token);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it.each(mapCases)('$name', async (options) => {
    getMockAdapter(options.host, {});
    expect(options.host.interceptors.request.handlers.length).toBe(options.interceptors);
    const { config } = await options.host.get('/');
    if (options.authorization === 'toBe') {
      expect(config.headers.authorization).toBe(options.toBe);
    } else {
      expect(config.headers.authorization).toBeUndefined();
    }
    expect(config.baseURL).toBe(baseURL);
  });
});
