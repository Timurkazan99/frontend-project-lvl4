import { mockError, useRollbar } from '@rollbar/react';
import useToast, { toasts } from '../../src/hooks/useToast.js';
import useStatusCheck from '../../src/hooks/useStatusCheck.js';

jest.mock('../../src/hooks/useToast.js');

describe('хук useStatusCheck', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка выполнения', () => {
    expect(useStatusCheck()).toBeInstanceOf(Function);
    expect(useRollbar).toBeCalledTimes(1);
    expect(useToast).toBeCalledTimes(1);
  });

  it('Успешный ответ', () => {
    const statusCheck = useStatusCheck();
    statusCheck({ status: 'ok' });
    expect(mockError).toBeCalledTimes(0);
    expect(toasts.networkError).toBeCalledTimes(0);
  });

  it('Ошибочный ответ', () => {
    const statusCheck = useStatusCheck();
    statusCheck({ status: 'error' });
    expect(mockError).toBeCalledTimes(1);
    expect(toasts.networkError).toBeCalledTimes(1);
  });
});
