import { createSlice } from '@reduxjs/toolkit';

const initialState = { show: false };

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

export const { onShow, onHide } = messagesSlice.actions;
export default messagesSlice.reducer;
