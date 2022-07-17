import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false };

/* eslint-disable no-param-reassign */
export const messagesSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onShow: (state) => {
      state.show = true;
    },
    onHide: (state) => {
      state.show = false;
    },
  },
});
/* eslint-enable no-param-reassign */

export const { onShow, onHide } = messagesSlice.actions;
export const { reducer } = messagesSlice;
