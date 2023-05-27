import EventEmitter from 'events';
import { mockDispatch } from 'react-redux';
import useSocket from '../../src/hooks/useSocket.js';
import { toasts } from '../../src/hooks/useToast.js';

jest.mock('../../src/hooks/useToast.js');

const toastNames = ['createChannel', 'renamingChannel', 'removeChannel'];
const mapCases = [
  {
    name: 'newMessage',
    count: 1,
    args: {
      body: 'adsad', channelId: 1, username: 'admin', id: 3,
    },
    results: [{
      payload: {
        body: 'adsad', channelId: 1, username: 'admin', id: 3,
      },
      type: 'messages/addMessage',
    }],
    toast: null,
  },
  {
    name: 'newChannel',
    count: 2,
    args: { name: 'Kotiki', removable: true, id: 4 },
    results: [
      { payload: { name: 'Kotiki', removable: true, id: 4 }, type: 'channels/addChannel' },
      { payload: { name: 'Kotiki', removable: true, id: 4 }, type: 'channels/setActive' },
    ],
    toast: 'createChannel',
  },
  {
    name: 'removeChannel',
    count: 1,
    args: { id: 4 },
    results: [{ payload: 4, type: 'channels/removeChannel' }],
    toast: 'removeChannel',
  },
  {
    name: 'renameChannel',
    count: 2,
    args: { name: 'Sobaki', removable: true, id: 4 },
    results: [
      { payload: { changes: { id: 4, name: 'Sobaki', removable: true }, id: 4 }, type: 'channels/updateChannel' },
      { payload: { id: 4, name: 'Sobaki', removable: true }, type: 'channels/setActive' },
    ],
    toast: 'renamingChannel',
  },
];

describe('хук useSocket', () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка выполнения', () => {
    const socket = useSocket(emitter);
    expect(socket).toBeInstanceOf(Function);
  });

  it('Обновление сокета', () => {
    const socket = useSocket(emitter);
    expect(emitter.eventNames()).toEqual([]);
    socket();
    expect(emitter.eventNames()).toEqual(mapCases.map(({ name }) => name));
  });

  it('Обновление сокета несколько раз', () => {
    const socket = useSocket(emitter);
    mapCases.forEach(({ name }) => {
      expect(emitter.listeners(name).length).toBe(0);
    });
    socket();
    mapCases.forEach(({ name }) => {
      expect(emitter.listeners(name).length).toBe(1);
    });
    socket();
    mapCases.forEach(({ name }) => {
      expect(emitter.listeners(name).length).toBe(1);
    });
  });

  it.each(mapCases)('Проверка события $name', ({
    name, count, args, toast, results,
  }) => {
    const socket = useSocket(emitter);
    socket();
    expect(mockDispatch).toBeCalledTimes(0);
    emitter.emit(name, args);

    expect(mockDispatch).toBeCalledTimes(count);

    results.forEach((result, i) => {
      expect(mockDispatch).toHaveBeenNthCalledWith(i + 1, expect.objectContaining(result));
    });

    toastNames.forEach((toastName) => {
      if (toastName !== toast) {
        expect(toasts[toastName]).not.toBeCalled();
      } else {
        expect(toasts[toastName]).toBeCalledTimes(1);
      }
    });
  });
});
