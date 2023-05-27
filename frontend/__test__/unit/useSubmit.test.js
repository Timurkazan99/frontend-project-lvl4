import { mockSetIsAuth, mockSetName } from 'react';
import { mockError } from '@rollbar/react';
import { mockNavigate } from 'react-router-dom';
import axios from 'axios';
import { toasts } from '../../src/hooks/useToast.js';
import { CHAT_ROUTE } from '../../src/utils/const.js';
import useSubmit from '../../src/hooks/useSubmit.js';
import getMockAdapter from '../helpers/getMockAdapter.js';

jest.mock('../../src/components/ContextProvider.jsx');
jest.mock('../../src/hooks/useToast.js');

const user = { username: 'login', password: 'password' };
const errorMessage = 'Проблемы с сервером';

const setup = async (status, response) => {
  getMockAdapter(axios, response, status);

  const formProps = {
    function: jest.fn(() => axios.post('').then(({ data }) => data)),
    errorCode: 500,
    errorMessage,
  };

  const submit = useSubmit(formProps);
  const mockActions = {
    setErrors: jest.fn(),
  };

  await submit(user, mockActions);
  return { func: formProps.function, setErrors: mockActions.setErrors };
};

const errorDefChecks = (func) => {
  expect(func).toBeCalledTimes(1);
  expect(func).toBeCalledWith(user.username, user.password);

  expect(mockSetName).not.toBeCalled();
  expect(mockSetIsAuth).not.toBeCalled();
  expect(mockNavigate).not.toBeCalled();
};

describe('хук UseSubmit', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Проверк выполнения', () => {
    const formProps = {
      function: jest.fn(),
      errorCode: '500',
      errorMessage: 'Проблемы с сервером',
    };
    const submit = useSubmit(formProps);
    expect(submit).toBeInstanceOf(Function);
  });

  it('Успешный submit', async () => {
    const name = 'Петя';
    const { func, setErrors } = await setup(200, { username: name });

    expect(func).toBeCalledTimes(1);
    expect(func).toBeCalledWith(user.username, user.password);
    expect(mockSetName).toBeCalledTimes(1);
    expect(mockSetName).toBeCalledWith(name);
    expect(mockSetIsAuth).toBeCalledTimes(1);
    expect(mockSetIsAuth).toBeCalledWith(true);
    expect(mockNavigate).toBeCalledTimes(1);
    expect(mockNavigate).toBeCalledWith(CHAT_ROUTE);

    expect(setErrors).not.toBeCalled();
    expect(toasts.networkError).not.toBeCalled();
    expect(mockError).not.toBeCalled();
  });

  it('Обрабатываемая ошибка', async () => {
    const { func, setErrors } = await setup(500, { errorMessage: 'Страница не найдена' });
    errorDefChecks(func);

    expect(setErrors).toBeCalledTimes(1);
    expect(setErrors).toBeCalledWith(errorMessage);

    expect(toasts.networkError).not.toBeCalled();
    expect(mockError).not.toBeCalled();
  });

  it('Не обрабатываемая ошибка', async () => {
    const { func, setErrors } = await setup(600, { errorMessage: 'Страница не найдена' });
    errorDefChecks(func);

    expect(setErrors).not.toBeCalled();

    expect(toasts.networkError).toBeCalledTimes(1);
    expect(mockError).toBeCalledTimes(1);
    expect(mockError).toHaveBeenCalledWith('Network error:', 'Request failed with status code 600');
  });
});
