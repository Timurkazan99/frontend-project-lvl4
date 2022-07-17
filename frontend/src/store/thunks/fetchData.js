import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../../http/dataAPI';

const thunkFetchData = createAsyncThunk(
  'fetch/data',
  async () => {
    return await fetchData();
  },
);

export default thunkFetchData;
