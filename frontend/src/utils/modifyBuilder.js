import thunkFetchData from '../store/thunks/fetchData.js';

const modifyBuilder = (builder, sliceAdapter, items) => builder
  .addCase(thunkFetchData.pending, (state) => {
    state.loading = 'loading';
    state.error = null;
  }).addCase(thunkFetchData.fulfilled, (state, { payload }) => {
    sliceAdapter.setAll(state, payload[items]);
    state.loading = 'loaded';
    state.error = null;
  }).addCase(thunkFetchData.rejected, (state, action) => {
    state.loading = 'failed';
    state.error = action.error;
  });

export default modifyBuilder;
