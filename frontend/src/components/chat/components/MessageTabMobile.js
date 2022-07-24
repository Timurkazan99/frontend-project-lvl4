import React from 'react';
import MessageTabHeaderMobile from "./MessageTabHeaderMobile";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";

const MessageTabMobile = () => {
  return (
    <div className="d-flex flex-column h-100">
      <MessageTabHeaderMobile />
      <MessageBox />
      <MessageInput />
    </div>
  );
};

export default MessageTabMobile;