import produce from 'immer';
import TimeDiff from '../../library/timeDiff';
import { ActionTypes } from '../action-types';

const initialState = {
    loading: false,
    error: null,
    data: null,
};

const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NEWS:
            state.loading = true;
            state.error = null;
            state.data = null;

            return state;
        case ActionTypes.FETCH_NEWS_ERROR:
            state.loading = false;
            state.error = action.payload;
            state.data = null;

            return state;
        case ActionTypes.FETCH_NEWS_COMPLETE:
            state.loading = false;
            state.data = action.payload;

            return state;
        default:
            return state;
    }
});

export default reducer;
