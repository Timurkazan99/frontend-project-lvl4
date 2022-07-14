import React, {useEffect, useContext} from 'react';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Context} from "../components/ContextProvider";
import {LOGIN_ROUTE} from "../utils/const";
import {thunkFetchData} from "../store/thunks/fetchData";
import {Col, Container, Row } from "react-bootstrap";
import ChannelContainer from "../components/ChannelContainer";
import ChatTab from "../components/ChatTab";
import SocketProvider from "../components/SocketProvider";

const Chat = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const {user} = useContext(Context);

    useEffect(() => {
      if (!user.isAuth) {
        navigate(LOGIN_ROUTE)
        return;
      }

      dispatch(thunkFetchData());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SocketProvider>
            <Container className="h-100 my-4 overflow-hidden rounded shadow">
                <Row className="h-100 bg-white flex-md-row">
                    <Col md={2} className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
                        <ChannelContainer />
                    </Col>
                    <Col className="col p-0 h-100">
                        <ChatTab />
                    </Col>
                </Row>
            </Container>
        </SocketProvider>
    );
};

export default Chat;
