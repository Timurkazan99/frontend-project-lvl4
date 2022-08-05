import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/const';
import { Context } from './ContextProvider.jsx';

function NavBar() {
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
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <NavLink style={{ color: 'white' }} to={CHAT_ROUTE}>Hexlet Chat</NavLink>
        { user.isAuth
          ? (
            <div>
              <span className="mx-3" style={{ color: 'white' }}>
                Ваш ник:
                {' '}
                {user.name}
              </span>
              <Button variant="primary" onClick={logout}>{t('logOut')}</Button>
            </div>
          )
          : null }
      </Container>
    </Navbar>
  );
}

export default NavBar;
