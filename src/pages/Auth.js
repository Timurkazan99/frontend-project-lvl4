import React from 'react';
import {Card, Container} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import SigningForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import {NavLink, useLocation} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Auth = () => {

    const location = useLocation();
    const isSignup = () => location.pathname === REGISTRATION_ROUTE;
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{ width: 600 }} className="px-5 py-3">
                <Card.Header className="text-center pl-4 pr-4 pb-4"><h2 className="m-auto">{isSignup() ? t('regTitle') : t('authTitle')}</h2></Card.Header>
                <Card.Body>
                    { isSignup() ? <SignupForm /> : <SigningForm />}
                </Card.Body>
                <Card.Footer className="text-center pt-3">
                    {
                        isSignup() ?
                            <>
                                <span>{t('registered')}</span> <NavLink to={LOGIN_ROUTE}>{t('authorization')}</NavLink>
                            </>
                            :
                            <>
                                <span>{t('notRegistered')}</span> <NavLink to={REGISTRATION_ROUTE}>{t('registration')}</NavLink>
                            </>
                    }
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Auth;
