import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import {thunkFetchData} from "../thunks/fetchData";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
    loading: null,
    error: null,
    active: { name: "general", id: 1 },
    selected: {eventName: 'newChannel'}
});

export const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: channelsAdapter.addOne,
        removeChannel: (state, action) => {
            channelsAdapter.removeOne(state, action);
            state.active = { name: "general", id: 1 };
        },
        updateChannel: channelsAdapter.updateOne,
        setActive: (state, action) => {
            state.active = action.payload;
        },
        setSelected: (state, action) => {
            state.selected = action.payload;
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