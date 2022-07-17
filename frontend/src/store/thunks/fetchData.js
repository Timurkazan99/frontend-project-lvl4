import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../../http/dataAPI';

export const thunkFetchData = createAsyncThunk(
  'fetch/data',
  async () => await fetchData(),
);
