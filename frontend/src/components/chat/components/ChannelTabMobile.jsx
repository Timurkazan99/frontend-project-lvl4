import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChannelList from './ChannelList.jsx';
import ChannelHeader from './ChannelHeader.jsx';
import { Context } from '../../ContextProvider.jsx';
import { LOGIN_ROUTE } from '../../../utils/const';

function ChannelTabMobile() {
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const { t } = useTranslation('translation', { keyPrefix: 'navBar' });

  const logout = () => {
    user.setIsAuth(false);
    user.setName('');
    localStorage.clear();
    navigate(LOGIN_ROUTE);
  };

  return (
    <div className="d-flex flex-column h-100">
      <ChannelHeader />
      <ChannelList />
      <div className="mt-auto px-2">
        <Button variant="danger" className="w-100" onClick={logout}>{t('logOut')}</Button>
      </div>
    </div>
  );
}

export default ChannelTabMobile;
