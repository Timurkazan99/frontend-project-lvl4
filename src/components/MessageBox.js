import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";

const MessageBox = ({active}) => {
    const chatBoxRef = useRef(null);
    const messages = useSelector((state) => state.messages);
    const filteredMessages = Object.values(messages.entities).filter((m) => m.channelId === active);

    useEffect(() => {
        chatBoxRef.current.scrollTop = 999999;
    });

    return (
        <div className="chat-messages overflow-auto px-5" ref={chatBoxRef}>
            {filteredMessages.map((m) =>
                <div key={m.id} className="text-break mb-2">
                    <b>{m.username}</b>: {m.body}
                </div>
            )}
        </div>
    );
};

export default MessageBox;