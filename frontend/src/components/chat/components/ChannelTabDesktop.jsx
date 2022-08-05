import React from 'react';
import ChannelList from './ChannelList.jsx';
import ChannelHeader from './ChannelHeader.jsx';

function ChannelTabDesktop() {
  return (
    <div className="h-100">
      <ChannelHeader />
      <ChannelList />
    </div>
  );
}

export default ChannelTabDesktop;
