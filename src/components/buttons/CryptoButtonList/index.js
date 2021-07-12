import { useMediaQuery } from '@material-ui/core';
import Button from '../Button';
import { useStyles } from './styles';
import CurrencyLogo from '../CurrencyLogo';

const CryptoButtonList = ({ children, currencies }) => {
    const styles = useStyles();
    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    const handleCurrencyClick = event => {
        event.preventDefault();
    };

    return (
        <ul className={styles.cryptoButtonList}>
            {currencies.length > 0 &&
                currencies
                    .filter((currency, index) => index < 3)
                    .map((currency, index) => (
                        <li>
                            <Button
                                key={index}
                                onClick={handleCurrencyClick}
                                text={!resolutionIsXS && currency.symbol}
                                style={{
                                    textTransform: 'uppercase',
                                }}
                            >
                                <CurrencyLogo path={currency.path} />
                            </Button>
                        </li>
                    ))}
            {children}
        </ul>
    );
};

export default CryptoButtonList;
