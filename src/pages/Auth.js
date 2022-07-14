import React from 'react';
import {Card, Container} from "react-bootstrap";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/const";
import SigningForm from "../components/SigninForm";
import SignupForm from "../components/SignupForm";
import {useLocation} from "react-router-dom";

const Auth = () => {

    const location = useLocation();
    const isSignup = () => location.pathname === REGISTRATION_ROUTE;

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{ width: 600 }} className="px-5 py-3">
                <Card.Header className="text-center pl-4 pr-4 pb-4"><h2 className="m-auto">Sign In</h2></Card.Header>
                <Card.Body>
                    { isSignup() ? <SignupForm /> : <SigningForm />}
                </Card.Body>
                <Card.Footer className="text-center pt-3">
                    {
                        isSignup() ?
                            <>
                                <span>Есть аккаунт?</span> <a href={LOGIN_ROUTE} className="keychainify-checked">Авторизация</a>
                            </>
                            :
                            <>
                                <span>Нет аккаунта?</span> <a href={REGISTRATION_ROUTE} className="keychainify-checked">Регистрация</a>
                            </>
                    }
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Auth;
