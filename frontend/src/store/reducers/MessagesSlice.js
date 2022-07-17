import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { thunkFetchData } from '../thunks/fetchData';
import { actions as channelActions } from './ChannelsSlice';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({ loading: null, error: null });

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchData.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(thunkFetchData.fulfilled, (state, action) => {
        const { messages } = action.payload;
        messagesAdapter.setAll(state, messages);
        state.loading = 'loaded';
        state.error = null;
      })
      .addCase(thunkFetchData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error;
      })
      .addCase(channelActions.removeChannel, (state, { payload: id }) => {
        const ids = Object.values(state.entities)
          .filter(({ channelId }) => channelId === id)
          .map(({ id }) => id);
        messagesAdapter.removeMany(state, ids);
      });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
