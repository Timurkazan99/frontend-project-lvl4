import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import modifyBuilder from '../../utils/modifyBuilder.js';

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({
  loading: null,
  error: null,
  active: { name: 'general', id: 1, removable: false },
  selected: { eventName: 'newChannel' },
});

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
    modifyBuilder(builder, channelsAdapter, 'channels');
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export const { reducer } = channelsSlice;
