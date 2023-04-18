import React, {useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import {LoginSchema, SignupSchema} from '../utils/validator';
import {login, registration} from '../http/userAPI';
import Field from "./Field.jsx";
import useSubmit from "../hooks/useSubmit";

const formMap = {
  signin: {
    fields: ["username", "password"],
    initialValues: {
      username: '',
      password: ''
    },
    schema: LoginSchema,
    function: login,
    errorCode: 401,
    errorMessage: { username: 'badUser', password: 'badUser' },
    submitBtn: 'logIn'
  },
  signup: {
    fields: ["username", "password", "passwordConfirmation"],
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: ''
    },
    schema: SignupSchema,
    function: registration,
    errorCode: 409,
    errorMessage: { username: 'signUpFailed' },
    submitBtn: 'signUp'
  }
}

function AuthForm({mode}) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const formProps = formMap[mode];

  const click = useSubmit(formProps);

  const formik = useFormik({
    validationSchema: formProps.schema,
    initialValues: formProps?.initialValues,
    onSubmit: click,
  });

  useEffect(() => {
    console.log(formik.errors);
  }, [formik.errors])

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      {formProps?.fields.map((field) => (
          <Field field={field} t={t} formik={formik}/>
      ))}
      <Button type="submit" className="w-100 mt-3" variant="outline-success">{t(formProps?.submitBtn)}</Button>
    </Form>
  );
}

export default AuthForm;
