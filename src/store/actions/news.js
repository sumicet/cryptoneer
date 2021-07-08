import TimeDiff from '../../library/timeDiff';
import { ActionTypes } from './actionTypes';

const updateDate = data => {
    const currentDate = new Date().getTime();
    data.forEach(
        news => (news.date = TimeDiff(news.published_on * 1000, currentDate))
    );
    return data;
};

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
                'https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=f3c546c70ef6589d69a94129bcf8074eb77209f55af6fcf5e8b3be0ee5def14e'
            );

            const json = await response.json();

            if (response.ok && json.Response !== 'Error') {
                const data = updateDate(json.Data);

                localStorage.setItem('news', JSON.stringify(data));

                dispatch({
                    type: ActionTypes.FETCH_NEWS_COMPLETE,
                    payload: data,
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
