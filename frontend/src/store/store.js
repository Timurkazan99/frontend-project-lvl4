import { combineReducers, configureStore } from '@reduxjs/toolkit';
import channelsSlice from './reducers/ChannelsSlice';
import messagesSlice from './reducers/MessagesSlice';
import modalSlice from './reducers/ModalSlice';

const rootReducer = combineReducers({
  channels: channelsSlice,
  messages: messagesSlice,
  modal: modalSlice,
});

export default function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
