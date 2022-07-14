import React from 'react';
import {useSelector} from "react-redux";

const ChatTabTitle =() => {

    const active = useSelector((state) => state.channels.active);
    const messages = useSelector((state) => state.messages);
    const filteredMessages = Object.values(messages.entities).filter((m) => m.channelId === active.id);

    return (
        <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
                <b># {active.name}</b>
            </p>
            <span className="text-muted">{filteredMessages.length} сообщений</span>
        </div>
    );
};

export default ChatTabTitle;