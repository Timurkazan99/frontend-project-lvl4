import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageTabMobile from './components/MessageTabMobile.jsx';
import { toChat } from '../../store/reducers/UiSlice';
import ChannelTabMobile from './components/ChannelTabMobile.jsx';

function MobileChat() {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.active);
  const activeTab = useSelector((state) => state.ui.activeTab);

  useEffect(() => {
    dispatch(toChat());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChannel]);

  return (activeTab === 'chat') ? <MessageTabMobile /> : <ChannelTabMobile />;
}

export default MobileChat;
