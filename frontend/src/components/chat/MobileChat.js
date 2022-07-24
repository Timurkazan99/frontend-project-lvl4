import React, {useEffect} from 'react';
import MessageTabMobile from "./components/MessageTabMobile";
import {useDispatch, useSelector} from "react-redux";
import {toChat} from "../../store/reducers/UiSlice"
import ChannelTabMobile from "./components/ChannelTabMobile";

const MobileChat = () => {
  const dispatch = useDispatch();
  const activeChannel = useSelector((state) => state.channels.active);
  const activeTab = useSelector((state) => state.ui.activeTab);

  useEffect(() => {
    dispatch(toChat())
  }, [activeChannel]);

  return (activeTab === 'chat') ? <MessageTabMobile /> : <ChannelTabMobile />;
};


export default MobileChat;