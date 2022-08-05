import React from 'react';
import MessageTabHeaderMobile from './MessageTabHeaderMobile.jsx';
import MessageBox from './MessageBox.jsx';
import MessageInput from './MessageInput.jsx';

function MessageTabMobile() {
  return (
    <div className="d-flex flex-column h-100">
      <MessageTabHeaderMobile />
      <MessageBox />
      <MessageInput />
    </div>
  );
}

export default MessageTabMobile;
