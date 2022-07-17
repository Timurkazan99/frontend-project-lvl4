import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {reducer as channelsSlice} from './reducers/ChannelsSlice';
import {reducer as messagesSlice} from './reducers/MessagesSlice';
import {reducer as modalSlice} from './reducers/ModalSlice';

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
