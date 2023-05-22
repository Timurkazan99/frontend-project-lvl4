import React, { useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRollbar } from '@rollbar/react';
import { Container } from 'react-bootstrap';
import { Context } from '../components/ContextProvider.jsx';
import { LOGIN_ROUTE } from '../utils/const';
import thunkFetchData from '../store/thunks/fetchData';
import SocketProvider from '../components/SocketProvider.jsx';
import useToast from '../hooks/useToast';
import DesktopChat from '../components/chat/DesktopChat.jsx';
import ChannelModal from '../components/modals/ChannelModal.jsx';
import MobileChat from '../components/chat/MobileChat.jsx';
import '../styles/message.scss';

function Chat() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, device } = useContext(Context);
  const channels = useSelector((state) => state.channels);
  const { networkError } = useToast();
  const rollbar = useRollbar();
  const classes = "h-100 overflow-hidden rounded";
  const forMobile = device.isMobile ? "my-2 p-0" : "shadow border my-2";

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
      <Container className={ `${classes} ${forMobile}` }>
        { device.isMobile ? <MobileChat /> : <DesktopChat /> }
        <ChannelModal />
      </Container>
    </SocketProvider>
  );
}

export default Chat;
