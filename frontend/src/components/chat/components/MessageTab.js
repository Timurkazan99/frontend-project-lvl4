import React from 'react';
import MessageTabHeaderDesktop from './MessageTabHeaderDesktop';
import MessageBox from './MessageBox';
import MessageInput from './MessageInput';

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
