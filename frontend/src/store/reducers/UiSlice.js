import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false, activeTab: 'list' };

/* eslint-disable no-param-reassign */
export const UiSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    onShow: (state) => {
      state.show = true;
    },
    onHide: (state) => {
      state.show = false;
    },
    toChat: (state) => {
      state.activeTab = 'chat';
    },
    toList: (state) => {
      state.activeTab = 'list';
    },
  }
  ,
});
/* eslint-enable no-param-reassign */

export const {
  onShow, onHide, toChat, toList,
} = UiSlice.actions;
export const { reducer } = UiSlice;
