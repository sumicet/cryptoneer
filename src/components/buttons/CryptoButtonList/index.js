import { useMediaQuery } from '@material-ui/core';
import Button from '../Button';
import { useStyles } from './styles';
import CurrencyLogo from '../CurrencyLogo';
import Chip from '../Chip';

const CryptoButtonList = ({ children, currencies }) => {
    const styles = useStyles();
    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    const handleCurrencyClick = event => {
        event.preventDefault();
        alert('click');
    };

    return (
        <ul className={styles.cryptoButtonList}>
            {currencies.length > 0 &&
                currencies
                    .filter((currency, index) => index < 3)
                    .map((currency, index) => (
                        <li>
                            {resolutionIsXS ? (
                                <div onClick={handleCurrencyClick}>
                                    <CurrencyLogo path={currency.path} />
                                </div>
                            ) : (
                                <Chip
                                    text={currency.symbol.toUpperCase()}
                                    avatar={
                                        <CurrencyLogo path={currency.path} />
                                    }
                                    onClick={handleCurrencyClick}
                                    background="transparent"
                                />
                            )}
                        </li>
                    ))}
            {children}
        </ul>
    );
};

export default CryptoButtonList;
