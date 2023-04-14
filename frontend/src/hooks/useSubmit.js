import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { CHAT_ROUTE } from '../utils/const';
import isHandleableError from '../utils/handleErrorStatus';
import { Context } from '../components/ContextProvider.jsx';
import useToast from './useToast';

const useSubmit = (formProps) => {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const rollbar = useRollbar();
  const { networkError } = useToast();

  return async ({ username, password }, actions) => {
    try {
      const data = await formProps.function(username, password);
      user.setName(data.username);
      user.setIsAuth(true);
      navigate(CHAT_ROUTE);
    } catch (e) {
      if (isHandleableError(e.response.status, formProps.errorCode)) {
        actions.setErrors(formProps.errorMessage);
      } else {
        networkError();
        rollbar.error('Network error:', e);
      }
    }
  };
};

export default useSubmit;
