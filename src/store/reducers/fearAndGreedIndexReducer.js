import produce from 'immer';
import { ActionTypes } from '../actions/actionTypes';

const initialState = {
    loading: true,
    error: null,
    data: null,
};

const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_FEAR_AND_GREED_INDEX:
            state.loading = true;
            state.error = null;
            state.data = null;

            return state;
        case ActionTypes.FETCH_FEAR_AND_GREED_INDEX_ERROR:
            state.loading = false;
            state.error = action.payload;
            state.data = null;

            return state;
        case ActionTypes.FETCH_FEAR_AND_GREED_INDEX_COMPLETE:
            state.loading = false;
            state.data = action.payload;

            return state;
        default:
            return state;
    }
});

export default reducer;
