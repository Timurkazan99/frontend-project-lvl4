import React, {useContext, useEffect, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import {SocketContext} from "./SocketProvider";
import {Formik} from "formik";
import responseStatusCheck from "../utils/responseStatusCheck";

const MessageInput = ({active, username, }) => {
    const socket = useContext(SocketContext);
    const messageRef = useRef(null);
    const emitCallback = (response) => responseStatusCheck(response, () => console.log("Error"));

    const click = ({message}, actions) => {
        socket.emit('newMessage', {body: message, channelId: active, username}, emitCallback);
        actions.setValues( { 'message': '' });
    }

    useEffect(() => {
        messageRef.current.focus();
    })

    return (
        <div className="mt-auto px-5 py-3">
            <Formik
                initialValues={{
                    message: '',
                }}
                onSubmit={click}
            >
                {({
                      handleSubmit,
                      handleChange,
                      values,
                  }) => (
                    <Form
                        className="py-1 border rounded-2"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <div className="input-group">
                            <Form.Control
                                ref={messageRef}
                                className="border-0 p-0 ps-2 form-control"
                                aria-label="Новое сообщение"
                                name="message"
                                type="message"
                                placeholder="Введите сообщение..."
                                value={values.message}
                                onChange={handleChange}
                            />
                            <Button type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                    <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z">
                                    </path>
                                </svg>
                                <span className="visually-hidden">send</span>
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default MessageInput;