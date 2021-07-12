import produce from 'immer';
import { ActionTypes } from '../actions/actionTypes';

const initialState = {
    loading: true,
    error: null,
    data: null,
    currencies: null,
};

const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NEWS:
            state.loading = true;
            state.error = null;
            state.data = null;
            state.currencies = null;

            return state;
        case ActionTypes.FETCH_NEWS_ERROR:
            state.loading = false;
            state.error = action.payload;
            state.data = null;
            state.currencies = null;

            return state;
        case ActionTypes.FETCH_NEWS_COMPLETE:
            state.loading = false;
            state.data = action.payload.data;
            state.currencies = action.payload.currencies;

            return state;
        default:
            return state;
    }
});

export default reducer;
