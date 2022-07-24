import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ChannelForm from './ChannelForm';
import DeleteChannel from './DeleteChannel';
import { onHide } from '../../store/reducers/UiSlice';

const ChannelModal = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.ui.show);
  const eventName = useSelector((state) => state.channels.selected.eventName);
  const close = () => dispatch(onHide());
  const { t } = useTranslation('translation', { keyPrefix: 'channelModal' });

  const mapping = {
    newChannel: {
      title: t('createTitle'),
      Component: ChannelForm,
    },
    renameChannel: {
      title: t('renameTitle'),
      Component: ChannelForm,
    },
    removeChannel: {
      title: t('deleteTitle'),
      Component: DeleteChannel,
    },
  };

  const { title, Component } = mapping?.[eventName];

  return (
    <Modal
      show={show}
      onHide={close}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Component  eventName={eventName} onHide={close} />
      </Modal.Body>
    </Modal>
  );
};

export default ChannelModal;
