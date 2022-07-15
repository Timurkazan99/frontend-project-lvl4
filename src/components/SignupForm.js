import React, {useContext} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {SignupSchema} from "../utils/validator";
import {useNavigate} from "react-router-dom";
import {Context} from "./ContextProvider";
import {registration} from "../http/userAPI";
import {CHAT_ROUTE} from "../utils/const";
import {isHandleableError} from "../utils/handleErrorStatus";
import {useTranslation} from "react-i18next";

const SignupForm = () => {

    const navigate = useNavigate();
    const {user} = useContext(Context);
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const click = async ({username, password}, actions) => {
        try {
            let data;
            data = await registration(username, password);
            console.log(data);
            user.setName(data.username);
            user.setIsAuth(true);
            navigate(CHAT_ROUTE);
        } catch (e) {
            if (isHandleableError(e.response.status, 409)) {
                actions.setErrors({username: 'signUpFailed'});
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
                label={t('username')}
                className="mt-3"
            >
                <Form.Control
                    name="username"
                    type="username"
                    placeholder={t('username')}
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.username && formik.errors.username}
                />
                <Form.Control.Feedback type="invalid">{t(formik.errors.username)}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="password"
                label={t('password')}
                className="mt-3"
            >
                <Form.Control
                    name="password"
                    type="password"
                    placeholder={t('password')}
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.password && formik.errors.password}
                />
                <Form.Control.Feedback type="invalid">{t(formik.errors.password)}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel
                controlId="passwordConfirmation"
                label={t('confirmPassword')}
                className="mt-3"
            >
                <Form.Control
                    name="passwordConfirmation"
                    type="password"
                    placeholder={t('confirmPassword')}
                    onInput={formik.handleChange}
                    isInvalid={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                />
                <Form.Control.Feedback type="invalid">{t(formik.errors.passwordConfirmation)}</Form.Control.Feedback>
            </FloatingLabel>
            <Button type="submit" className="w-100 mt-3" variant={"outline-success"}>{t('signUp')}</Button>
        </Form>
    );
};

export default SignupForm;