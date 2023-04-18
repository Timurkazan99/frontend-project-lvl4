import React, { useContext, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ChannelSchema } from '../../utils/validator';
import { SocketContext } from '../SocketProvider.jsx';
import useStatusCheck from '../../hooks/useStatusCheck';

function ChannelForm({ onHide }) {
  const socket = useContext(SocketContext);
  const inputRef = useRef();
  const selected = useSelector((state) => state.channels.selected);
  const channels = useSelector((state) => state.channels.entities);
  const channelsNames = Object.values(channels).map(({ name }) => name);
  const validationSchema = ChannelSchema(channelsNames);
  const { t } = useTranslation('translation', { keyPrefix: 'channelModal' });
  const responseStatusCheck = useStatusCheck();

  const click = ({ channelName }, actions) => {
    const payload = selected.id ? { name: channelName, id: selected.id } : { name: channelName };
    socket.emit(selected.eventName, payload, responseStatusCheck);
    actions.setValues({ channelName: '' });
    onHide();
  };

  const formik = useFormik({
    validationSchema,
    initialValues: {
      channelName: '',
    },
    onSubmit: click,
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    console.log(formik.errors.channelName);
  }, [formik.errors]);

  return (
    <Form
      onSubmit={formik.handleSubmit}
    >
      <div>
        <Form.Label htmlFor="channelName" visuallyHidden>{t('fieldLabel')}</Form.Label>
        <Form.Control
          className="mb-2"
          id="channelName"
          name="channelName"
          placeholder={t('fieldPlaceholder')}
          value={formik.values.channelName}
          ref={inputRef}
          onChange={formik.handleChange}
          isInvalid={formik.touched.channelName && formik.errors.channelName}
        />
        <Form.Control.Feedback type="invalid">{t(formik.errors.channelName)}</Form.Control.Feedback>
        <div className="d-flex justify-content-end">
          <Button
            type="button"
            className="me-2 btn btn-secondary"
            onClick={onHide}
          >
            {t('cancel')}
          </Button>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={formik.values.channelName === '' || formik.isSubmitting}
          >
            {t('accept')}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default ChannelForm;
