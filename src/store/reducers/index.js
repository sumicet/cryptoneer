import { combineReducers } from 'redux';
import newsReducer from './newsReducer';
import coinsReducer from './coinsReducer';
import globalMetricsReducer from './globalMetricsReducer';

const reducers = combineReducers({
    news: newsReducer,
    coins: coinsReducer,
    globalMetrics: globalMetricsReducer,
});

export default reducers;
