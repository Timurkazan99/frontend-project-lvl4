import React from 'react';
import ChatTabTitle from "./ChatTabTitle";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";


const ChatTab = () => {

    return (
        <div className="d-flex flex-column h-100">
            <ChatTabTitle />
            <MessageBox />
            <MessageInput />
        </div>
    );
};

export default ChatTab;