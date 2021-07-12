import { ActionTypes } from './actionTypes';

export const fetchFearAndGreedIndex = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX,
        });

        const oldData = JSON.parse(localStorage.getItem('fearAndGreedIndex'));

        if (oldData) {
            dispatch({
                type: ActionTypes.FETCH_FEAR_AND_GREED_INDEX_COMPLETE,
                payload: oldData,
            });
            return;
        }

        try {
            const response = await fetch(
                'https://api.alternative.me/fng/?limit=36500'
            );

            const json = await response.json();

            if (response.ok && json.metadata.error === null) {
                localStorage.setItem(
                    'fearAndGreedIndex',
                    JSON.stringify(json.data)
                );
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
