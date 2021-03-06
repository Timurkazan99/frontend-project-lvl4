import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { Context } from '../components/ContextProvider';
import { LOGIN_ROUTE } from '../utils/const';
import thunkFetchData from '../store/thunks/fetchData';
import SocketProvider from '../components/SocketProvider';
import useToast from '../hooks/useToast';
import DesktopChat from "../components/chat/DesktopChat";
import ChannelModal from "../components/modals/ChannelModal";
import { Container } from "react-bootstrap";
import MobileChat from "../components/chat/MobileChat";

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, device } = useContext(Context);
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
        <Container className="h-100 my-2 overflow-hidden rounded shadow">
          {device.isMobile ? <MobileChat/> : <DesktopChat/>}
          <ChannelModal />
        </Container>
    </SocketProvider>
  );
}

export default Chat;
