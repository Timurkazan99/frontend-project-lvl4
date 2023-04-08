import React from 'react';
import MessageTabHeaderContent from "./MessageTabHeaderContent.jsx";
import "../../../styles/messageHeader.scss"

const MessageTabHeaderDesktop = () => {
  return (
    <div className="bg-light message-header small border-bottom">
      <MessageTabHeaderContent />
    </div>
  );
};

export default MessageTabHeaderDesktop;