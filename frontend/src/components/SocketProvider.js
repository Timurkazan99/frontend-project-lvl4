import React, {createContext, useEffect} from 'react';
import useSocket from "../hooks/useSocket";
import {io} from "socket.io-client";

export const SocketContext = createContext(null);

const SocketProvider = ({children}) => {
    const socket = io('http://localhost:5001/', {
        transports: [ "websocket" ]
    });

    const update = useSocket(socket);

    useEffect(() => {
        update();
        return () => socket.disconnect();
    });

    return (
        <SocketContext.Provider
            value={socket}
        >
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
