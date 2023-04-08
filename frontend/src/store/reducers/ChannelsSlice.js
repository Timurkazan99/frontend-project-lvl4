import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import thunkFetchData from '../thunks/fetchData';
import fetchDataReducer from '../../utils/fetchReducer';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  loading: null,
  error: null,
  active: { name: 'general', id: 1, removable: false },
  selected: { eventName: 'newChannel' },
});

/* eslint-disable no-param-reassign */
export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      channelsAdapter.removeOne(state, action);
      state.active = { name: 'general', id: 1 };
    },
    updateChannel: channelsAdapter.updateOne,
    setActive: (state, action) => {
      state.active = action.payload;
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(thunkFetchData.pending, fetchDataReducer.pending)
      .addCase(thunkFetchData.fulfilled, (state, {payload: {channels}}) => {
        fetchDataReducer.fulfilled(state, channels, channelsAdapter);
      })
      .addCase(thunkFetchData.rejected, fetchDataReducer.rejected);
  },
});
/* eslint-enable no-param-reassign */

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export const { reducer } = channelsSlice;
