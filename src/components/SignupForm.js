import React, {useContext} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {SignupSchema} from "../utils/validator";
import {useNavigate} from "react-router-dom";
import {Context} from "./ContextProvider";
import {registration} from "../http/userAPI";
import {CHAT_ROUTE} from "../utils/const";

const SignupForm = () => {

    const navigate = useNavigate();
    const {user} = useContext(Context);

    const click = async ({username, password}, actions) => {
        try {
            let data;
            data = await registration(username, password);
            console.log(data);
            user.setName(data.username);
            user.setIsAuth(true);
            navigate(CHAT_ROUTE);
        } catch (e) {
            if (e.response.status = 409) {
                actions.setErrors({username: ['Этот ник уже занят, выберете другой']});
            } else {
                alert('Проблемы с сетью, попробуйте ещё раз...');
            }
        }
    }

    const formik = useFormik({
        validationSchema: SignupSchema,
        initialValues: {
            username: '',
            password: '',
            passwordConfirmation: '',
        },
        onSubmit: click
    });

    return (
        <Form noValidate onSubmit={formik.handleSubmit}>
            <FloatingLabel
                controlId="username"
                label="Username"
                className="mt-3"
            >
                <Form.Control
                    name="username"
                    type="username"
                    placeholder="Username"
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.username && formik.errors.username}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
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
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="passwordConfirmation"
                label="Password confirmation"
                className="mt-3"
            >
                <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Password confirmation"
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
            </FloatingLabel>
            <Button type="submit" className="w-100 mt-3" variant={"outline-success"}>Log in</Button>
        </Form>
    );
};

export default SignupForm;