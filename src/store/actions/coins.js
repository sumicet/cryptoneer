import { ActionTypes } from './actionTypes';

export const fetchAllCoins = () => {
    return async dispatch => {
        dispatch({
            type: ActionTypes.FETCH_ALL_COINS,
        });

        const oldData = JSON.parse(localStorage.getItem('coins'));

        if (oldData) {
            dispatch({
                type: ActionTypes.FETCH_ALL_COINS_COMPLETE,
                payload: oldData,
            });
            return;
        }

        try {
            const response = await fetch(
                'https://min-api.cryptocompare.com/data/all/coinlist'
            );

            const json = await response.json();

            if (response.ok && json.Response !== 'Error') {
                // bit of filtering cus we only need the symbol and the name
                const filteredData = [];
                for (const [key, value] of Object.entries(json.Data)) {
                    const result = {
                        symbol: value.Symbol.toLowerCase(),
                        name: value.CoinName.toLowerCase(),
                    };
                    filteredData.push(result);
                }
                try {
                    localStorage.setItem('coins', JSON.stringify(filteredData));
                } catch (err) {
                    throw err;
                }

                dispatch({
                    type: ActionTypes.FETCH_ALL_COINS_COMPLETE,
                    payload: filteredData,
                });
            } else {
                dispatch({
                    type: ActionTypes.FETCH_ALL_COINS_ERROR,
                    payload: 'Cryptocompare Coins - ' + json.Message,
                });
            }
        } catch (err) {
            dispatch({
                type: ActionTypes.FETCH_ALL_COINS_ERROR,
                payload: 'Cryptocompare Coins - ' + err.message,
            });
        }
    };
};
