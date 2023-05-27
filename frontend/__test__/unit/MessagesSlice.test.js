import { reducer } from '../../src/store/reducers/MessagesSlice.js';
import thunkFetchData from '../../src/store/thunks/fetchData.js';

jest.unmock('react-redux');

const cases = [
  {
    name: 'Добавить сообщение',
    type: 'messages/addMessage',
    data: {
      payload: {
        id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
      },
    },
    state: {
      ids: [], entities: {}, loading: 'loaded', error: null,
    },
    expected: {
      ids: [1],
      entities: {
        1: {
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        },
      },
      loading: 'loaded',
      error: null,
    },
  },
  {
    name: 'Добавить сообщение с пустым состоянием',
    type: 'messages/addMessage',
    data: {
      payload: {
        id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
      },
    },
    state: undefined,
    expected: {
      ids: [1],
      entities: {
        1: {
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        },
      },
      loading: null,
      error: null,
    },
  },
  {
    name: 'Начало загрузки',
    type: thunkFetchData.pending.type,
    data: null,
    state: {
      ids: [], entities: {}, loading: null, error: null,
    },
    expected: {
      ids: [], entities: {}, loading: 'loading', error: null,
    },
  },
  {
    name: 'Начало загрузки с пустым состоянием',
    type: thunkFetchData.pending.type,
    data: null,
    state: undefined,
    expected: {
      ids: [], entities: {}, loading: 'loading', error: null,
    },
  },
  {
    name: 'Конец загрузки',
    type: thunkFetchData.fulfilled.type,
    data: {
      payload: {
        messages: [{
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        }, {
          id: 2, channelId: 2, body: 'Привет', username: 'Петр',
        }],
      },
    },
    state: {
      ids: [], entities: {}, loading: 'loaded', error: null,
    },
    expected: {
      ids: [1, 2],
      entities: {
        1: {
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        },
        2: {
          id: 2, channelId: 2, body: 'Привет', username: 'Петр',
        },
      },
      loading: 'loaded',
      error: null,
    },
  },
  {
    name: 'Конец загрузки с пустым состоянием',
    type: thunkFetchData.fulfilled.type,
    data: {
      payload: {
        messages: [{
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        }, {
          id: 2, channelId: 2, body: 'Привет', username: 'Петр',
        }],
      },
    },
    state: undefined,
    expected: {
      ids: [1, 2],
      entities: {
        1: {
          id: 1, channelId: 2, body: 'Всем привет', username: 'Иван',
        },
        2: {
          id: 2, channelId: 2, body: 'Привет', username: 'Петр',
        },
      },
      loading: 'loaded',
      error: null,
    },
  },
  {
    name: 'Ошибка при загрузке',
    type: thunkFetchData.rejected.type,
    data: { error: 'wrong data' },
    state: {
      ids: [], entities: {}, loading: 'loaded', error: null,
    },
    expected: {
      ids: [], entities: {}, loading: 'failed', error: 'wrong data',
    },
  },
  {
    name: 'Ошибка при загрузке с пустым состоянием',
    type: thunkFetchData.rejected.type,
    data: { error: 'wrong data' },
    state: undefined,
    expected: {
      ids: [], entities: {}, loading: 'failed', error: 'wrong data',
    },
  },
  {
    name: 'Удаление канала',
    type: 'channels/removeChannel',
    data: { payload: 1 },
    state: {
      ids: [1, 2, 3, 4],
      entities: {
        1: {
          id: 1, channelId: 1, body: 'Всем привет', username: 'Иван',
        },
        2: {
          id: 2, channelId: 1, body: 'Привет, Иван!', username: 'Пётр',
        },
        3: {
          id: 3, channelId: 2, body: 'Что делать?', username: 'Паша',
        },
        4: {
          id: 4, channelId: 1, body: 'Привет', username: 'Саша',
        },
      },
      loading: null,
      error: null,
    },
    expected: {
      ids: [3],
      entities: {
        3: {
          id: 3, channelId: 2, body: 'Что делать?', username: 'Паша',
        },
      },
      loading: null,
      error: null,
    },
  },
  {
    name: 'Удаление канала без сообщений',
    type: 'channels/removeChannel',
    data: { payload: 2 },
    state: {
      ids: [1],
      entities: {
        1: {
          id: 1, channelId: 1, body: 'Всем привет', username: 'Иван',
        },
      },
      loading: null,
      error: null,
    },
    expected: {
      ids: [1],
      entities: {
        1: {
          id: 1, channelId: 1, body: 'Всем привет', username: 'Иван',
        },
      },
      loading: null,
      error: null,
    },
  },
  {
    name: 'Удаление канала с пустым состоянием',
    type: 'channels/removeChannel',
    data: { payload: 2 },
    state: undefined,
    expected: {
      ids: [], entities: {}, loading: null, error: null,
    },
  },
];

describe('Message slice', () => {
  it.each(cases)('$name', ({
    type, data, state, expected,
  }) => {
    expect(reducer(state, { type, ...data })).toEqual(expected);
  });
});
