import { reducer } from '../../src/store/reducers/ChannelsSlice.js';
import thunkFetchData from '../../src/store/thunks/fetchData.js';

jest.unmock('react-redux');

const defState = {
  ids: [],
  entities: {},
  loading: null,
  error: null,
  active: { name: 'general', id: 1, removable: false },
  selected: { eventName: 'newChannel' },
};

const mapCases = [
  {
    name: 'Добавить канал',
    type: 'channels/addChannel',
    data: { payload: { id: 3, name: 'Радио', removable: true } },
    state: defState,
    expected: { ...defState, ids: [3], entities: { 3: { id: 3, name: 'Радио', removable: true } } },
  },
  {
    name: 'Добавить канал с пустым состоянием',
    type: 'channels/addChannel',
    data: { payload: { id: 3, name: 'Радио', removable: true } },
    state: undefined,
    expected: { ...defState, ids: [3], entities: { 3: { id: 3, name: 'Радио', removable: true } } },
  },
  {
    name: 'Удалить канал',
    type: 'channels/removeChannel',
    data: { payload: 3 },
    state: {
      ...defState,
      ids: [1, 2, 3],
      entities: {
        1: { id: 1, name: 'Радио', removable: true },
        2: { id: 2, name: 'Видео', removable: true },
        3: { id: 3, name: 'Обсуждения', removable: true },
      },
      active: { name: 'Видео', id: 2 },
    },
    expected: {
      ...defState,
      ids: [1, 2],
      entities: {
        1: { id: 1, name: 'Радио', removable: true },
        2: { id: 2, name: 'Видео', removable: true },
      },
      active: { name: 'general', id: 1 },
    },
  },
  {
    name: 'Удалить канал с пустым состоянием',
    type: 'channels/updateChannel',
    data: { payload: 3 },
    state: undefined,
    expected: defState,
  },
  {
    name: 'Изменить канал',
    type: 'channels/updateChannel',
    data: { payload: { id: 2, changes: { name: 'Телефоны', removable: false } } },
    state: {
      ...defState,
      ids: [1, 2],
      entities: {
        1: { id: 1, name: 'Радио', removable: true },
        2: { id: 2, name: 'Видео', removable: true },
      },
    },
    expected: {
      ...defState,
      ids: [1, 2],
      entities: {
        1: { id: 1, name: 'Радио', removable: true },
        2: { id: 2, name: 'Телефоны', removable: false },
      },
    },
  },
  {
    name: 'Изменить канал с пустым состоянием',
    type: 'channels/updateChannel',
    data: { payload: { id: 2, changes: { name: 'Телефоны', removable: false } } },
    state: undefined,
    expected: defState,
  },
  {
    name: 'Изменить активный канал',
    type: 'channels/setActive',
    data: { payload: { id: 2, name: 'Телефоны', removable: false } },
    state: defState,
    expected: { ...defState, active: { id: 2, name: 'Телефоны', removable: false } },
  },
  {
    name: 'Изменить активный канал с пустым состоянием',
    type: 'channels/setActive',
    data: { payload: { id: 2, name: 'Телефоны', removable: false } },
    state: undefined,
    expected: { ...defState, active: { id: 2, name: 'Телефоны', removable: false } },
  },
  {
    name: 'Изменить выбранное',
    type: 'channels/setSelected',
    data: { payload: { eventName: 'renameChannel' } },
    state: defState,
    expected: { ...defState, selected: { eventName: 'renameChannel' } },
  },
  {
    name: 'Изменить выбранное',
    type: 'channels/setSelected',
    data: { payload: { eventName: 'renameChannel' } },
    state: undefined,
    expected: { ...defState, selected: { eventName: 'renameChannel' } },
  },
  {
    name: 'Начало загрузки',
    type: thunkFetchData.pending.type,
    data: null,
    state: defState,
    expected: { ...defState, loading: 'loading', error: null },
  },
  {
    name: 'Начало загрузки с пустым состоянием',
    type: thunkFetchData.pending.type,
    data: null,
    state: undefined,
    expected: { ...defState, loading: 'loading', error: null },
  },
  {
    name: 'Конец загрузки',
    type: thunkFetchData.fulfilled.type,
    data: {
      payload: {
        channels: [{ id: 1, name: 'Телефоны', removable: true }, { id: 2, name: 'Видео', removable: false }],
      },
    },
    state: defState,
    expected: {
      ...defState,
      ids: [1, 2],
      entities: {
        1: { id: 1, name: 'Телефоны', removable: true },
        2: { id: 2, name: 'Видео', removable: false },
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
        channels: [{ id: 1, name: 'Телефоны', removable: true }, { id: 2, name: 'Видео', removable: false }],
      },
    },
    state: undefined,
    expected: {
      ...defState,
      ids: [1, 2],
      entities: {
        1: { id: 1, name: 'Телефоны', removable: true },
        2: { id: 2, name: 'Видео', removable: false },
      },
      loading: 'loaded',
      error: null,
    },
  },
  {
    name: 'Ошибка при загрузке',
    type: thunkFetchData.rejected.type,
    data: { error: 'wrong data' },
    state: defState,
    expected: { ...defState, loading: 'failed', error: 'wrong data' },
  },
  {
    name: 'Ошибка при загрузке с пустым состоянием',
    type: thunkFetchData.rejected.type,
    data: { error: 'wrong data' },
    state: undefined,
    expected: { ...defState, loading: 'failed', error: 'wrong data' },
  },
];

describe('Channels slice', () => {
  it.each(mapCases)('$name', ({
    type, data, state, expected,
  }) => {
    expect(reducer(state, { type, ...data })).toEqual(expected);
  });
});
