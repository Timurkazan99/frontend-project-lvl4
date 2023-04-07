import React, { useContext } from 'react';
import { Card, Container } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/const';
import SigningForm from '../components/SigninForm.jsx';
import SignupForm from '../components/SignupForm.jsx';
import { Context } from "../components/ContextProvider.jsx";

function Auth() {
  const location = useLocation();
  const { device } = useContext(Context);
  const isSignup = () => location.pathname === REGISTRATION_ROUTE;
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });
  const cardStyles = device.isMobile ? 'border-0' : "px-5 py-3";
  const cardHeaderStyles = device.isMobile ? "text-center border-0" : "text-center";
  const cardBodyStyles = device.isMobile ? "border-0" : "";
  const cardFooterStyles = device.isMobile ? "text-center border-0" : "text-center pt-3";

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className={ cardStyles }>
        <Card.Header className={ cardHeaderStyles }><h2 className="m-auto">{isSignup() ? t('regTitle') : t('authTitle')}</h2></Card.Header>
        <Card.Body className={ cardBodyStyles }>
          { isSignup() ? <SignupForm /> : <SigningForm />}
        </Card.Body>
        <Card.Footer className={ cardFooterStyles }>
          {
            isSignup()
              ? (
                <>
                  <span>{t('registered')}</span>
                  {' '}
                  <NavLink to={LOGIN_ROUTE}>{t('authorization')}</NavLink>
                </>
              )
              : (
                <>
                  <span>{t('notRegistered')}</span>
                  {' '}
                  <NavLink to={REGISTRATION_ROUTE}>{t('registration')}</NavLink>
                </>
              )
          }
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default Auth;
