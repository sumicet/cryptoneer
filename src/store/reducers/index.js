import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import coinsReducer from './coinsReducer';
import globalMetricsReducer from './globalMetricsReducer';
import fearAndGreedIndexReducer from './fearAndGreedIndexReducer';

const reducers = combineReducers({
    news: newsReducer,
    coins: coinsReducer,
    globalMetrics: globalMetricsReducer,
    fearAndGreedIndex: fearAndGreedIndexReducer,
});

export default reducers;
