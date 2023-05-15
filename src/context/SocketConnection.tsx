import { IMessageBody, ISendMessagePayload } from '@/interfaces';
import {
  addIncomingMessage,
  setSocketConnection,
  startSendMessageThunk,
  useAppDispatch
} from '@/redux';
import { SocketManager } from '@/sockets/socket';
import React, { createContext, useEffect } from 'react';

export interface ISocketConnectionContext {
  sendMessage: (message: ISendMessagePayload) => void;
}

export const ChatSocketContext = createContext<ISocketConnectionContext>({
  sendMessage: (message: ISendMessagePayload) => {},
});

export const ChatSocketProvider: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const dispatch = useAppDispatch();

  const sendMessage = (message: ISendMessagePayload) => {
    const socket = SocketManager.getInstance({});
    if (socket.connected) {
      dispatch(startSendMessageThunk(message));
    }
  };

  const onConnect = () => {
    dispatch(setSocketConnection(true));
  };

  const onDisconnect = () => {
    dispatch(setSocketConnection(false));
  };

  const incomingMessage = (message: IMessageBody) => {
    dispatch(addIncomingMessage(message));
  };

  useEffect(() => {
    const socket = SocketManager.getInstance({
      'x-token': localStorage.getItem('x-token') ?? '',
    });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('incomingMessage', incomingMessage);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('incomingMessage', incomingMessage);
      socket.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ChatSocketContext.Provider
        value={{ sendMessage: sendMessage }}
      >
        {children}
      </ChatSocketContext.Provider>
    </>
  );
};
