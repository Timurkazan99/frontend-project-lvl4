import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import useSocket from '../hooks/useSocket';

export const SocketContext = createContext(null);

function SocketProvider({ children }) {
  console.log(process.env.REACT_APP_HOST);
  const socket = io(process.env.REACT_APP_HOST, {
    transports: ['websocket'],
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
}

export default SocketProvider;
