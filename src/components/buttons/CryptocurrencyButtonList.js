import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Button from './Button';
import { useCallback } from 'react';

const CryptocurrencyButtonList = ({
    children,
    categories,
    title,
    allCoins,
}) => {
    const theme = useTheme();

    const useStyles = makeStyles({
        cryptoButtonList: {
            display: 'flex',
            flexDirection: 'row',
        },
    });

    const styles = useStyles();
    const [currencies, setCurrencies] = useState([]);

    // ******************* SET THE CATEGORIES FOR AN ARTICLE ******************

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

    const setCategories = useCallback(() => {
        let updatedCurrencies = [...currencies];

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
                allCoins.map(currency => currency.symbol).includes(word)
            ) {
                updatedCurrencies = addCurrency(updatedCurrencies, word);
            }
        });

        // look through the title
        titleWordsLowerCase.forEach(word => {
            // check if word is a currency name
            const indexName = allCoins.findIndex(
                currency => currency.name === word
            );
            // make sure you don't add it twice
            if (
                indexName > -1 &&
                updatedCurrencies.findIndex(
                    currency => currency.symbol === allCoins[indexName].symbol
                ) === -1
            ) {
                updatedCurrencies = addCurrency(
                    updatedCurrencies,
                    allCoins[indexName].symbol
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
            const indexSymbol = allCoins.findIndex(
                currency => currency.symbol.toUpperCase() === word
            );
            // make sure you don't add it twice
            if (
                indexSymbol > -1 &&
                updatedCurrencies.findIndex(
                    currency =>
                        currency.symbol ===
                        allCoins[indexSymbol].symbol.toLowerCase()
                ) === -1
            ) {
                updatedCurrencies = addCurrency(
                    updatedCurrencies,
                    allCoins[indexSymbol].symbol.toLowerCase()
                );
            }
        });
        setCurrencies(updatedCurrencies);
    }, [allCoins, categories, currencies, title]);

    useEffect(() => {
        setCategories();
        // eslint-disable-next-line
    }, []);

    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    const handleCurrencyClick = event => {
        event.preventDefault();
    };

    const ButtonCurrencyLogo = ({ currency }) => {
        return (
            <img
                src={currency.path}
                width={theme.sizing.icon}
                height={theme.sizing.icon}
                alt="Currency Icon"
            />
        );
    };

    return (
        <div className={styles.cryptoButtonList}>
            {currencies.length > 0 &&
                currencies
                    .filter((currency, index) => index < 3)
                    .map((currency, index) => (
                        <Button
                            key={index}
                            onClick={handleCurrencyClick}
                            text={!resolutionIsXS && currency.symbol}
                            style={{
                                textTransform: 'uppercase',
                            }}
                        >
                            <ButtonCurrencyLogo currency={currency} />
                        </Button>
                    ))}
            {children}
        </div>
    );
};

export default CryptocurrencyButtonList;
