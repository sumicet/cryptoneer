import produce, { current } from 'immer';
import { ActionTypes } from '../actions/actionTypes';

const initialState = {
    loading: true,
    error: null,
    data: null,
    currencies: null,
    filtered: null,
};

const reducer = produce((state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_NEWS:
            state.loading = true;
            state.error = null;
            state.data = null;
            state.currencies = null;
            state.filtered = null;

            return state;
        case ActionTypes.FETCH_NEWS_ERROR:
            state.loading = false;
            state.error = action.payload;
            state.data = null;
            state.currencies = null;
            state.filtered = null;

            return state;
        case ActionTypes.FETCH_NEWS_COMPLETE:
            state.loading = false;
            state.data = action.payload.data;
            state.currencies = action.payload.currencies;
            state.filtered = action.payload.data;

            return state;
        case ActionTypes.FILTER_NEWS:
            state.filtered = state.data.filter(data => {
                const arrReducer = (accumulator, symbol) =>
                    accumulator &&
                    data.currencies.map(curr => curr.symbol).includes(symbol);
                return action.payload
                    .map(curr => curr.symbol)
                    .reduce(arrReducer, true);
            });

            return state;
        default:
            return state;
    }
});

export default reducer;
