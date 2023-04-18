import React from 'react';
import {FloatingLabel, Form} from "react-bootstrap";

const Field = ({field, formik, t}) => {
    const type = field.includes("password") ? 'password' : 'text';
    console.log(formik.errors);
    return (
        <FloatingLabel
            controlId={field}
            label={t(field)}
            className="mt-3"
        >
            <Form.Control
                name={field}
                type={type}
                placeholder={t(field)}
                onInput={formik.handleChange}
                isInvalid={formik.touched[field] && formik.errors[field]}
            />
            <Form.Control.Feedback type="invalid">{t(formik.errors[field])}</Form.Control.Feedback>
        </FloatingLabel>
    );
};

export default Field;