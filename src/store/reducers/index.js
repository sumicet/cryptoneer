import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import coinsReducer from './coinsReducer';

const reducers = combineReducers({
    news: newsReducer,
    coins: coinsReducer,
});

export default reducers;
