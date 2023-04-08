import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchData from '../thunks/fetchData';
import { actions as channelActions } from './ChannelsSlice';
import fetchDataReducer from '../../utils/fetchReducer';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({ loading: null, error: null });

/* eslint-disable no-param-reassign */
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchData.pending, fetchDataReducer.pending)
      .addCase(thunkFetchData.fulfilled, (state, {payload: {messages}}) => {
        fetchDataReducer.fulfilled(state, messages, messagesAdapter)
      })
      .addCase(thunkFetchData.rejected, fetchDataReducer.rejected)
      .addCase(channelActions.removeChannel, (state, { payload: id }) => {
        const ids = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map(({ id: messageId }) => messageId);
        messagesAdapter.removeMany(state, ids);
      });
  },
});
/* eslint-enable no-param-reassign */

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export const { reducer } = messagesSlice;
