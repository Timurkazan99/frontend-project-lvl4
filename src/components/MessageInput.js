import React, {useContext, useEffect, useRef} from 'react';
import {Button, Form, InputGroup} from "react-bootstrap";
import {SocketContext} from "./SocketProvider";
import {useFormik} from "formik";
import responseStatusCheck from "../utils/responseStatusCheck";
import {useSelector} from "react-redux";
import {Context} from "./ContextProvider";

const MessageInput = () => {
    const active = useSelector((state) => state.channels.active.id);
    const {user} = useContext(Context);
    const socket = useContext(SocketContext);
    const messageRef = useRef(null);

    const click = ({message}, actions) => {
        socket.emit('newMessage', {body: message, channelId: active, 'username': user.name}, responseStatusCheck);
        actions.setValues( { 'message': '' });
    };

    const formik = useFormik({
        initialValues: {
        message: '',
    },
        onSubmit: click
    });

    useEffect(() => {
        messageRef.current.focus();
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Form
                className="p-1 border border-primary rounded-pill"
                noValidate
                onSubmit={formik.handleSubmit}
            >
                <InputGroup
                    className="py-1"
                >
                    <Form.Control
                        ref={messageRef}
                        className="border-0 rounded-pill form-control"
                        aria-label="Новое сообщение"
                        name="message"
                        type="message"
                        placeholder="Введите сообщение..."
                        value={formik.values.message}
                        onChange={formik.handleChange}
                    />
                    <Button
                        type="submit"
                        className="border-0"
                        disabled={formik.values.message === '' || formik.isSubmitting}
                        variant="outline-primary"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                            </path>
                        </svg>
                        <span className="visually-hidden">send</span>
                    </Button>
                </InputGroup>
            </Form>
        </div>
    );
};

export default MessageInput;