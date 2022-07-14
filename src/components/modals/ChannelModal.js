import React from 'react';
import {Modal} from "react-bootstrap";
import ChannelForm from "./ChannelForm";
import DeleteChannel from "./DeleteChannel";
import {useDispatch, useSelector} from "react-redux";
import {onHide} from "../../store/reducers/ModalSlice";

const ChannelModal = () => {
    const dispatch = useDispatch();
    const show = useSelector((state) => state.modal.show);
    const eventName = useSelector((state) => state.channels.selected.eventName);
    const close = () => dispatch(onHide());

    const mapping = {
        'newChannel': {
            title: 'Добавить канал',
            Component: () =>  <ChannelForm eventName={eventName} onHide={close}/>
        },
        'renameChannel': {
            title: 'Переименовать канал',
            Component: () => <ChannelForm eventName={eventName} onHide={close}/>
        },
        'removeChannel': {
            title: 'Удалить канал',
            Component: () => <DeleteChannel onHide={close} />
        },
    }

    const {title, Component} = mapping?.[eventName];

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
                <Component />
            </Modal.Body>
        </Modal>
    );
};

export default ChannelModal;