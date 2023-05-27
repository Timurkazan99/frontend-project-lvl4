import { createAsyncThunk } from '@reduxjs/toolkit';
import fetchData from '../../http/dataAPI.js';

const thunkFetchData = createAsyncThunk(
  'fetch/data',
  async () => fetchData(),
);

export default thunkFetchData;
