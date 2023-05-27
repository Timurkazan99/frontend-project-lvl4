import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageTab from './components/MessageTab.jsx';
import { toChat } from '../../store/reducers/UiSlice';
import ChannelTab from './components/ChannelTab.jsx';

function MobileChat() {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.active);
  const activeTab = useSelector((state) => state.ui.activeTab);

  useEffect(() => {
    dispatch(toChat());
  }, [activeChannel]);

  return (activeTab === 'chat') ? <MessageTab /> : <ChannelTab />;
}

export default MobileChat;
