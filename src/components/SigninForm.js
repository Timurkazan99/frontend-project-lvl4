import React, {useContext} from 'react';
import {Button, FloatingLabel, Form} from "react-bootstrap";
import {useFormik} from "formik";
import {LoginSchema} from "../utils/validator";
import {useNavigate} from "react-router-dom";
import {Context} from "./ContextProvider";
import {login} from "../http/userAPI";
import {CHAT_ROUTE} from "../utils/const";
import {isHandleableError} from "../utils/handleErrorStatus";
import {useTranslation} from "react-i18next";

const SigningForm = () => {

    const navigate = useNavigate();
    const {user} = useContext(Context);
    const { t } = useTranslation('translation', { keyPrefix: 'auth' });

    const click = async ({username, password}, actions) => {
        try {
            let data;
            data = await login(username, password);
            user.setName(data.username);
            user.setIsAuth(true);
            navigate(CHAT_ROUTE);
        } catch (e) {
            if (isHandleableError(e.response.status, 401)) {
                actions.setErrors({username: 'badUsername', password: 'badPassword'})
            } else {
                alert('Проблемы с сетью, попробуйте ещё раз...')
            }
        }
    }

    const formik = useFormik({
        validationSchema: LoginSchema,
        initialValues: {
            username: '',
            password: '',
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
            <Button type="submit" className="w-100 mt-3" variant={"outline-success"}>{t('logIn')}</Button>
        </Form>
    );
};

export default SigningForm;