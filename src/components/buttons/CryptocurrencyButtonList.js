import { makeStyles, useMediaQuery } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Button from './Button';

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

    useEffect(() => {
        let updatedCurrencies = [...currencies];

        // set only accepts unique words

        const words = [
            ...new Set(categories.split('|').map(word => word.toLowerCase())),
        ];

        const regex = /([a-zA-Z])\w+/g; // words only, no symbols

        const titleWords = [...new Set(title.match(regex))];

        const titleWordsLowerCase = [
            ...new Set(title.match(regex).map(word => word.toLowerCase())),
        ];

        let supportedCurrencies = [];
        for (const [key, value] of Object.entries(allCoins)) {
            const result = {
                symbol: value.Symbol.toLowerCase(),
                name: value.CoinName.toLowerCase(),
            };
            supportedCurrencies.push(result);
        }

        // look through categories
        words.forEach(word => {
            // check if word is a currency symbol
            // make sure you don't add it twice
            if (
                updatedCurrencies.findIndex(
                    currency => currency.symbol === word
                ) === -1 &&
                supportedCurrencies
                    .map(currency => currency.symbol)
                    .includes(word)
            ) {
                updatedCurrencies = addCurrency(updatedCurrencies, word);
            }
        });

        // look through the title

        titleWordsLowerCase.forEach(word => {
            // check if word is a currency name
            const indexName = supportedCurrencies.findIndex(
                currency => currency.name === word
            );
            // make sure you don't add it twice
            if (
                indexName > -1 &&
                updatedCurrencies.findIndex(
                    currency =>
                        currency.symbol ===
                        supportedCurrencies[indexName].symbol
                ) === -1
            ) {
                updatedCurrencies = addCurrency(
                    updatedCurrencies,
                    supportedCurrencies[indexName].symbol
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
            let supportedCurrencies = [];
            for (const [key, value] of Object.entries(allCoins)) {
                const result = {
                    symbol: value.Symbol.toUpperCase(),
                    name: value.CoinName.toUpperCase(),
                };
                supportedCurrencies.push(result);
            }
            const indexSymbol = supportedCurrencies.findIndex(
                currency => currency.symbol === word
            );
            // make sure you don't add it twice
            if (
                indexSymbol > -1 &&
                updatedCurrencies.findIndex(
                    currency =>
                        currency.symbol ===
                        supportedCurrencies[indexSymbol].symbol.toLowerCase()
                ) === -1
            ) {
                updatedCurrencies = addCurrency(
                    updatedCurrencies,
                    supportedCurrencies[indexSymbol].symbol.toLowerCase()
                );
            }
        });
        setCurrencies(updatedCurrencies);
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
                        >
                            <ButtonCurrencyLogo currency={currency} />
                        </Button>
                    ))}
            {children}
        </div>
    );
};

export default CryptocurrencyButtonList;
