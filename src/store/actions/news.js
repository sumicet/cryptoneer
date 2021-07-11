import { ActionTypes } from './actionTypes';

export const fetchNews = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_NEWS,
        });

        const oldData = JSON.parse(localStorage.getItem('news'));

        if (oldData) {
            dispatch({
                type: ActionTypes.FETCH_NEWS_COMPLETE,
                payload: oldData,
            });
            return;
        }

        try {
            const response = await fetch(
                'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
            );

            const json = await response.json();

            if (response.ok && json.Response !== 'Error') {
                localStorage.setItem('news', JSON.stringify(json.Data));

                dispatch({
                    type: ActionTypes.FETCH_NEWS_COMPLETE,
                    payload: json.Data,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_NEWS_ERROR,
                    payload: 'Cryptocompare News - ' + json.Message,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_NEWS_ERROR,
                payload: 'Cryptocompare News - ' + err.message,
            });
        }
    };
};
