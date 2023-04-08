
class fetchDataReducer {
    pending (state) {
        state.loading = 'loading';
        state.error = null;
    }

    fulfilled (state, items, sliceAdapter) {
        sliceAdapter.setAll(state, items);
        state.loading = 'loaded';
        state.error = null;
    }

    rejected (state, action) {
        state.loading = 'failed';
        state.error = action.error;
    }
}

module.exports = new fetchDataReducer();