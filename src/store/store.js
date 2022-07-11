import {combineReducers, configureStore} from "@reduxjs/toolkit";
import channelsReducer from "./reducers/ChannelsSlice";
import messagesSlice from "./reducers/MessagesSlice";

const rootReducer = combineReducers({
    channels: channelsReducer,
    messages: messagesSlice
});

export default function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
};