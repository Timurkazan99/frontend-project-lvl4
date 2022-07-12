import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {thunkFetchData} from "../thunks/fetchData";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ loading: null, error: null, active: 1 });

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        removeChannel: channelsAdapter.removeOne,
        updateChannel: channelsAdapter.updateOne,
        setActive: (state, action) => {
            state.active = action.payload.id;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(thunkFetchData.pending, (state) => {
                state.loading = 'loading';
                state.error = null;
            })
            .addCase(thunkFetchData.fulfilled, (state, action) => {
                const {channels} = action.payload;
                channelsAdapter.setAll(state, channels);
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