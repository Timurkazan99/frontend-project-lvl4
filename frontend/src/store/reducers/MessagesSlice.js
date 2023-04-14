import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './ChannelsSlice';
import modifyBuilder from '../../utils/modifyBuilder';

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
    modifyBuilder(builder, messagesAdapter, 'messages')
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
