import { useTheme } from '@material-ui/core';

const CurrencyLogo = ({ path }) => {
    const theme = useTheme();
    return (
        <img
            src={path}
            width={theme.sizing.icon}
            height={theme.sizing.icon}
            alt="Currency Icon"
        />
    );
};

export default CurrencyLogo;
