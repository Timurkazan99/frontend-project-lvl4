import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {actions as messagesActions} from "../store/reducers/MessagesSlice";
import {actions as channelsActions} from "../store/reducers/ChannelsSlice";


export default function useSocket () {
    const dispatch = useDispatch();
    const socket = io('http://localhost:5000/', {
        transports: [ "websocket" ]
    });

    socket.removeAllListeners();

    socket.on('newMessage', (payload) => {
        dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
        dispatch(channelsActions.addChannel(payload));
        dispatch(channelsActions.setActive(payload));
    });

    socket.on('removeChannel', (payload) => {
        dispatch(channelsActions.removeChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
        dispatch(channelsActions.updateChannel({id: payload.id, changes: payload}));
    });

    return socket;
}