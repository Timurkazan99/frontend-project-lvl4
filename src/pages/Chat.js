import React, {useEffect, useContext, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";
import {Context} from "../components/ContextProvider";
import {LOGIN_ROUTE} from "../utils/const";
import {thunkFetchData} from "../store/thunks/fetchData";
import {Col, Container, Row, Tab, ListGroup} from "react-bootstrap";
import ChannelList from "../components/channelList";

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
        <Container className="my-4 mx-auto overflow-hidden rounded shadow p-0" style={{"min-height": '865px', "min-width": '936px'}}>
            <Row className="bg-white flex-md-row mt-3" style={{height: "100vh"}}>
                <Col md={2} className="border-end  p-0">
                    <ChannelList active={active} />
                </Col>
                <Col>

                </Col>
            </Row>
        </Container>
    );
};

export default Chat;
