// https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=7b93d4f3-4a0d-45f5-8896-6295cb438d7a

import { ActionTypes } from './actionTypes';

export const fetchFearAndGreedIndex = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX,
        });

        try {
            const response = await fetch(
                'https://api.alternative.me/fng/?limit=30'
            );

            const json = await response.json();

            if (response.ok && json.metadata.error === null) {
                dispatch({
                    type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX_COMPLETE,
                    payload: json.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX_ERROR,
                    payload: 'Fear & Greed Index - ' + json.metadata.error,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX_ERROR,
                payload: 'Fear & Greed Index - ' + err.message,
            });
        }
    };
};
