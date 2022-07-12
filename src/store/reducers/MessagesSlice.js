import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {thunkFetchData} from "../thunks/fetchData";

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState({ loading: null, error: null });

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: messagesAdapter.addOne,
        removeMessage: messagesAdapter.removeOne,
        updateMessage: messagesAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkFetchData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(thunkFetchData.fulfilled, (state, action) => {
                messagesAdapter.setAll(state, action.payload.messages);
                state.loading = 'loaded';
                state.error = null;
            })
            .addCase(thunkFetchData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error;
            });
    }
})

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const {actions} = messagesSlice;
export default messagesSlice.reducer;