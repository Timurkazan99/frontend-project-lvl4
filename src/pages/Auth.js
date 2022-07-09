import React from 'react';
import { Formik } from 'formik';
import {Card, Container, Form, FloatingLabel, Button} from "react-bootstrap";
import {LoginSchema} from "../utils/validator";

const Auth = () => {
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
                            email: '',
                            password: '',
                        }}
                        onSubmit={(e) => {
                            console.log(e)
                        }}
                    >
                    {({
                          handleSubmit,
                          handleChange,
                          errors,
                          touched
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <FloatingLabel
                                controlId="email"
                                label="Email address"
                                className="mt-3"
                            >
                                <Form.Control
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    onInput={handleChange}
                                />
                                {touched.email && errors.email && <div>{errors.email}</div>}
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