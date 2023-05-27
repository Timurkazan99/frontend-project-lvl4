import MockAdapter from 'axios-mock-adapter';

const getMockAdapter = (host, response, status = 200) => {
  const mock = new MockAdapter(host);
  mock.onAny(/.*/).reply(status, response);
};

export default getMockAdapter;
