import { ActionTypes } from './actionTypes';

export const fetchAllCoins = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_ALL_COINS,
        });

        try {
            const response = await fetch(
                'https://min-api.cryptocompare.com/data/all/coinlist'
            );

            const json = await response.json();

            if (response.ok && json.Response !== 'Error') {
                dispatch({
                    type: ActionTypes.FETCH_ALL_COINS_COMPLETE,
                    payload: json.Data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_ALL_COINS_ERROR,
                    payload: json.Message,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_ALL_COINS_ERROR,
                payload: err.message,
            });
        }
    };
};
