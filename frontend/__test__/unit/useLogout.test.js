import { mockSetName, mockSetIsAuth } from 'react';
import { mockNavigate } from 'react-router-dom';
import useLogout from '../../src/hooks/useLogout.js';
import { LOGIN_ROUTE } from '../../src/utils/const.js';

jest.mock('../../src/components/ContextProvider.jsx');

describe('хук useLogout', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверка выполнения', () => {
    expect(useLogout()).toBeInstanceOf(Function);
  });

  it('Проверка функции', () => {
    const logout = useLogout();
    logout();

    expect(mockSetName).toBeCalledTimes(1);
    expect(mockSetName).toBeCalledWith('');

    expect(mockSetIsAuth).toBeCalledTimes(1);
    expect(mockSetIsAuth).toBeCalledWith(false);

    expect(localStorage.clear).toBeCalledTimes(1);

    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith(LOGIN_ROUTE);
  });
});
