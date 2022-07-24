import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as channelsSlice } from './reducers/ChannelsSlice';
import { reducer as messagesSlice } from './reducers/MessagesSlice';
import { reducer as uiSlice } from './reducers/UiSlice';

const rootReducer = combineReducers({
  channels: channelsSlice,
  messages: messagesSlice,
  ui: uiSlice,
});

export default function setupStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
