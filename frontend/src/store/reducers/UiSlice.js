import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false, activeTab: 'list' };

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
  },
});

export const {
  onShow, onHide, toChat, toList,
} = UiSlice.actions;
export const { reducer } = UiSlice;
