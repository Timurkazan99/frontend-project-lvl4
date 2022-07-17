import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { useRollbar } from '@rollbar/react';
import { Context } from '../components/ContextProvider';
import { LOGIN_ROUTE } from '../utils/const';
import { thunkFetchData } from '../store/thunks/fetchData';
import ChannelContainer from '../components/ChannelContainer';
import ChatTab from '../components/ChatTab';
import SocketProvider from '../components/SocketProvider';
import ChannelModal from '../components/modals/ChannelModal';
import useToast from '../hooks/useToast';

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useContext(Context);
  const channels = useSelector((state) => state.channels);
  const { networkError } = useToast();
  const rollbar = useRollbar();

  useEffect(() => {
    if (!user.isAuth) {
      navigate(LOGIN_ROUTE);
      return;
    }

    rollbar.log('Connected');
    dispatch(thunkFetchData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(channels.error);
    if (channels.error) {
      networkError();
      rollbar.error('Network error', channels.error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channels.error]);

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
        <ChannelModal />
      </Container>
    </SocketProvider>
  );
}

export default Chat;
