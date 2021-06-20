import { ActionTypes } from '../../action-types';

export const fetchNews = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_NEWS,
        });

        try {
            const response = await fetch(
                'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=f3c546c70ef6589d69a94129bcf8074eb77209f55af6fcf5e8b3be0ee5def14e'
            );

            const json = await response.json();

            if (response.ok && json.Response !== 'Error') {
                dispatch({
                    type: ActionTypes.FETCH_NEWS_COMPLETE,
                    payload: json.Data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_NEWS_ERROR,
                    payload: json.Message,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_NEWS_ERROR,
                payload: err.message,
            });
        }
    };
};
