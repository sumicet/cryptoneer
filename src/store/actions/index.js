import { ActionTypes } from '../action-types';

export const fetchNews = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_NEWS,
        });

        try {
            const response = await fetch(
                'https://cryptopanic-api.herokuapp.com/api/v1/posts/?auth_token=729986d4456a94bdec1e104f453553a4b27158bd&filter=hot&public=true'
            );

            const json = await response.json();

            if (response.ok) {
                dispatch({
                    type: ActionTypes.FETCH_NEWS_COMPLETE,
                    payload: json.results,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_NEWS_ERROR,
                    payload: json.info,
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
