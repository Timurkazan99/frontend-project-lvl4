import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {thunkFetchData} from "../thunks/fetchData";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ loading: 'idle', error: null });

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkFetchData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(thunkFetchData.fulfilled, (state, action) => {
                channelsAdapter.setAll(state, action.payload.channels);
                state.loading = 'loaded';
                state.error = null;
            })
            .addCase(thunkFetchData.rejected, (state, action) => {
                state.loading = 'failed';
                state.error = action.error;
            });
    }
})

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const {actions} = channelsSlice;
export default channelsSlice.reducer;