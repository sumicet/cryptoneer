import { ActionTypes } from './actionTypes';
import { fetchAllCoins } from './coins';

const addCurrency = (updatedCurrencies, symbol) => {
    try {
        const path = require(`../../svg/color/${symbol}.svg`).default;
        updatedCurrencies.push({
            path: path,
            symbol: symbol,
        });
    } catch (err) {}
    return updatedCurrencies;
};

const getCategories = (title, categories, coins) => {
    let updatedCurrencies = [];

    // GTK a Set only accepts unique words

    const words = [
        ...new Set(categories.split('|').map(word => word.toLowerCase())),
    ];

    const regex = /([a-zA-Z])\w+/g; // words only, no symbols

    const titleWords = [...new Set(title.match(regex))];

    const titleWordsLowerCase = [
        ...new Set(title.match(regex).map(word => word.toLowerCase())),
    ];

    // look through categories
    words.forEach(word => {
        // check if word is a currency symbol
        // make sure you don't add it twice
        if (
            // currency.symbol is already lower case btw
            updatedCurrencies.findIndex(
                currency => currency.symbol === word
            ) === -1 &&
            coins.map(currency => currency.symbol).includes(word)
        ) {
            updatedCurrencies = addCurrency(updatedCurrencies, word);
        }
    });

    // look through the title
    titleWordsLowerCase.forEach(word => {
        // check if word is a currency name
        const indexName = coins.findIndex(currency => currency.name === word);
        // make sure you don't add it twice
        if (
            indexName > -1 &&
            updatedCurrencies.findIndex(
                currency => currency.symbol === coins[indexName].symbol
            ) === -1
        ) {
            updatedCurrencies = addCurrency(
                updatedCurrencies,
                coins[indexName].symbol
            );
        }
    });

    // look through the title without converting the words to lower case
    // cus example title: "Crypto and NFTS are popping off!"
    // there could be a coin called "AND" or "OFF"

    titleWords.forEach(word => {
        // check if word is a currency symbol
        // i don't want to mess with the word
        // i don't want to convert let's say the "and" from "Whales and Elon Musk"
        // to "AND", so i need all supported currencies to be uppercase
        // to only look for uppercase words
        const indexSymbol = coins.findIndex(
            currency => currency.symbol.toUpperCase() === word
        );
        // make sure you don't add it twice
        if (
            indexSymbol > -1 &&
            updatedCurrencies.findIndex(
                currency =>
                    currency.symbol === coins[indexSymbol].symbol.toLowerCase()
            ) === -1
        ) {
            updatedCurrencies = addCurrency(
                updatedCurrencies,
                coins[indexSymbol].symbol.toLowerCase()
            );
        }
    });

    return updatedCurrencies;
};

export const fetchNews = () => {
    return async (dispatch, getState) => {
        // we need all coins for categories (for both local storage and normal fetching)
        await dispatch(fetchAllCoins());
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

            const coins = getState().coins;

            // TODO make this async somehow

            if (response.ok && json.Response !== 'Error') {
                const filteredData = json.Data.map(coin => {
                    return {
                        id: coin.id,
                        title: coin.title,
                        url: coin.url,
                        published_on: coin.published_on,
                        currencies: getCategories(
                            coin.title,
                            coin.categories,
                            coins.data
                        ),
                    };
                });

                localStorage.setItem('news', JSON.stringify(filteredData));

                dispatch({
                    type: ActionTypes.FETCH_NEWS_COMPLETE,
                    payload: filteredData,
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
