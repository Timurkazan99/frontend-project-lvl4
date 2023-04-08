import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/const';
import AuthForm from '../components/AuthForm.jsx';
import { Context } from "../components/ContextProvider.jsx";
import "../styles/auth.scss";

const authMap = {
  signin: {
    title: 'authTitle',
    span: 'notRegistered',
    route: REGISTRATION_ROUTE,
    link: 'registration'
  },
  signup: {
    title: 'regTitle',
    span: 'registered',
    route: LOGIN_ROUTE,
    link: 'authorization'
  }
}

function Auth() {
  const location = useLocation();
  const { device } = useContext(Context);
  const mode = location.pathname === LOGIN_ROUTE ? 'signin' : 'signup';
  const auth = authMap[mode];
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  return (
    <Container
      className={device.isMobile ? "mobile auth-container" : "auth-container"}
    >
      <Card style={{ width: 600 }} className="auth-card">
        <Card.Header className="auth-card-header"><h2 className="m-auto">{t(auth?.title)}</h2></Card.Header>
        <Card.Body className="auth-card-body">
          <AuthForm mode={mode} />
        </Card.Body>
        <Card.Footer className="auth-card-footer">
          <span>{t(auth?.span)}</span>
          {' '}
          <NavLink to={auth?.route}>{t(auth?.link)}</NavLink>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Auth;
