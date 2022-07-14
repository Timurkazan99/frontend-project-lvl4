import React, {memo, useContext} from 'react';
import {useSelector} from "react-redux";
import ChatTabTitle from "./ChatTabTitle";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import {Context} from "./ContextProvider";

const ChatTab = memo(() => {
    const active = useSelector((state) => state.channels.active);
    const {user} = useContext(Context);

    return (
        <div className="d-flex flex-column h-100">
            <ChatTabTitle name={active.name} active={active.id}/>
            <MessageBox active={active.id}/>
            <MessageInput active={active.id} username={user.name} />
        </div>
    );
});

export default ChatTab;