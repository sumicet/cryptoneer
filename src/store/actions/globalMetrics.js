// https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=7b93d4f3-4a0d-45f5-8896-6295cb438d7a

import { ActionTypes } from './actionTypes';

export const fetchGlobalMetrics = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_GLOBAL_METRICS,
        });

        try {
            //1aa30109967d39b6973427961647331161ba2179d6276dfe4611d223750b
            const response = await fetch(
                'https://api.cryptorank.io/v1/global?api_key=c42b3484bc9fa789126c705ab6fe9034b287a5e7133430e720f23c37883b'
            );

            const json = await response.json();

            if (response.ok && json.status.success) {
                dispatch({
                    type: ActionTypes.FETCH_GLOBAL_METRICS_COMPLETE,
                    payload: json.data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_GLOBAL_METRICS_ERROR,
                    payload: 'Cryptorank - ' + json.status.message,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_GLOBAL_METRICS_ERROR,
                payload: 'Cryptorank - ' + err.message,
            });
        }
    };
};
