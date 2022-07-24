import { batch, useDispatch } from 'react-redux';
import { actions as messagesActions } from '../store/reducers/MessagesSlice';
import { actions as channelsActions } from '../store/reducers/ChannelsSlice';
import useToast from './useToast';

export default function useSocket(socket) {
  const dispatch = useDispatch();
  const { createChannel, renamingChannel, removeChannel } = useToast();

  return () => {
    socket.removeAllListeners();

    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      batch(() => {
        dispatch(channelsActions.addChannel(payload));
        dispatch(channelsActions.setActive(payload));
      });
      createChannel(payload.name);
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.removeChannel(payload.id));
      removeChannel();
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.updateChannel({ id: payload.id, changes: payload }));
      dispatch(channelsActions.setActive(payload));
      renamingChannel(payload.name);
    });
  };
}
