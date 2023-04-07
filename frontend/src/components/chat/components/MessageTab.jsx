import React from 'react';
import MessageBox from './MessageBox.jsx';
import MessageInput from './MessageInput.jsx';
import MessageTabHeaderDesktop from './MessageTabHeaderDesktop.jsx';

function MessageTab() {
  return (
    <div className="d-flex flex-column h-100">
      <MessageTabHeaderDesktop />
      <MessageBox />
      <MessageInput />
    </div>
  );
}

export default MessageTab;
