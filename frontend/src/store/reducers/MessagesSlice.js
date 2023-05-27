import { createSlice, createEntityAdapter, current } from '@reduxjs/toolkit';
import { actions as channelActions } from './ChannelsSlice.js';
import modifyBuilder from '../../utils/modifyBuilder.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({ loading: null, error: null });

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    modifyBuilder(builder, messagesAdapter, 'messages')
      .addCase(channelActions.removeChannel, (state, { payload: id }) => {
        const curState = current(state);
        const ids = Object.values(curState.entities)
          .filter(({ channelId }) => channelId === id)
          .map(({ id: messageId }) => messageId);
        messagesAdapter.removeMany(state, ids);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export const { reducer } = messagesSlice;
