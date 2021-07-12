import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Button from '../Button';
import { useStyles } from './styles';

const CryptoButtonList = ({ children, currencies }) => {
    const theme = useTheme();
    const styles = useStyles();
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

export default CryptoButtonList;
