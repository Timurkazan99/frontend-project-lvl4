import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/const';
import { Context } from '../components/ContextProvider.jsx';

const useLogout = () => {
  const { user } = useContext(Context);
  const navigate = useNavigate();

  return () => {
    user.setIsAuth(false);
    user.setName('');
    localStorage.clear();
    navigate(LOGIN_ROUTE);
  };
};

export default useLogout;
