import React from 'react';
import MessageTabHeaderDesktop from './MessageTabHeaderDesktop.jsx';
import MessageBox from './MessageBox.jsx';
import MessageInput from './MessageInput.jsx';

function MessageTab() {
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <MessageTabHeaderDesktop />
      </div>
      <MessageBox />
      <MessageInput />
    </div>
  );
}

export default MessageTab;
