import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CHAT_ROUTE } from '../utils/const';
import { Context } from './ContextProvider.jsx';
import useLogout from "../hooks/useLogout";

function NavBar() {
  const { user } = useContext(Context);
  const { t } = useTranslation('translation', { keyPrefix: 'navBar' });
  const logout = useLogout();

  return (
    <Navbar bg="dark" variant="dark">
      <Container className="d-flex justify-content-between">
        <NavLink style={{ color: 'white' }} to={CHAT_ROUTE}>Hexlet Chat</NavLink>
        { user.isAuth && (
            <div>
              <span className="mx-3" style={{ color: 'white' }}>
                Ваш ник:
                {' '}
                {user.name}
              </span>
              <Button variant="primary" onClick={logout}>{t('logOut')}</Button>
            </div>
          )
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;
