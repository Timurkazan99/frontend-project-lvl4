import { tSpy } from 'react-i18next';
import { toast } from 'react-toastify';
import useToast from '../../src/hooks/useToast.js';

const mapCases = [
  {
    name: 'Создание канала',
    toastName: 'createChannel',
    type: 'info',
    times: 2,
    messages: ['sentencesStart', 'sentencesAddingEnd'],
  },
  {
    name: 'Изменение канала',
    toastName: 'renamingChannel',
    type: 'info',
    times: 2,
    messages: ['sentencesStart', 'sentencesRenamingEnd'],
  },
  {
    name: 'Удаление канала',
    toastName: 'removeChannel',
    type: 'info',
    times: 2,
    messages: ['sentencesStart', 'sentencesRemovingEnd'],
  },
  {
    name: 'Ошибка',
    toastName: 'networkError',
    type: 'error',
    times: 1,
    messages: ['errorNetwork'],
  },
];

describe('Хук useToast', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка полей', () => {
    const toasts = useToast();
    expect(toasts.createChannel).toBeInstanceOf(Function);
    expect(toasts.renamingChannel).toBeInstanceOf(Function);
    expect(toasts.removeChannel).toBeInstanceOf(Function);
    expect(toasts.networkError).toBeInstanceOf(Function);
  });

  it.each(mapCases)('$name', ({
    toastName, type, messages, times,
  }) => {
    const toasts = useToast();
    toasts[toastName]();
    expect(toast[type]).toBeCalledTimes(1);
    expect(tSpy).toBeCalledTimes(times);
    messages.forEach((message, i) => {
      expect(tSpy).toHaveBeenNthCalledWith(i + 1, message);
    });
  });
});
