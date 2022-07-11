import React, {useContext} from 'react';
import { Formik } from 'formik';
import {Card, Container, Form, FloatingLabel, Button} from "react-bootstrap";
import {LoginSchema} from "../utils/validator";
import {Context} from "../components/ContextProvider";
import {useNavigate} from "react-router-dom";
import {CHAT_ROUTE} from "../utils/const";
import {login} from "../http/userAPI";

const Auth = () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const click = async ({username, password}) => {
        try {
            let data;
            data = await login(username, password);
            user.setName(data.username);
            user.setIsAuth(true);
            navigate(CHAT_ROUTE);
        } catch (e) {
            alert(e.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{ width: 600 }} className="px-5 py-3">
                <Card.Header className="text-center pl-4 pr-4 pb-4"><h2 className="m-auto">Sign In</h2></Card.Header>
                <Card.Body>
                    <Formik
                        validationSchema={LoginSchema}
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        onSubmit={click}
                    >
                    {({
                          handleSubmit,
                          handleChange,
                          errors,
                          touched
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <FloatingLabel
                                controlId="username"
                                label="Username"
                                className="mt-3"
                            >
                                <Form.Control
                                    name="username"
                                    type="username"
                                    placeholder="Username"
                                    onInput={handleChange}
                                />
                                {touched.username && errors.username && <div>{errors.username}</div>}
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="password"
                                label="Password"
                                className="mt-3"
                            >
                                <Form.Control
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onInput={handleChange}
                                />
                                {touched.password && errors.password && <div>{errors.password}</div>}
                            </FloatingLabel>
                            <Button type="submit" className="w-100 mt-3" variant={"outline-success"}>Log in</Button>
                        </Form>
                    )}
                </Formik>
                    </Card.Body>
                <Card.Footer className="text-center pt-3">
                    <span>Нет аккаунта?</span> <a href="/signup" className="keychainify-checked">Регистрация</a>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Auth;
