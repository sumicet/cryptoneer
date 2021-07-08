import { Button as MuiButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Text from '../text/Text';

/**
 * @param children an icon.
 * @param size "small", "large". Default "small".
 */

const useStyles = makeStyles(theme => ({
    button: {
        color: theme.palette.text.secondary,
        background: 'transparent',
        padding: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            padding: theme.spacing(0.5),
        },
        minHeight: 0,
        minWidth: 0,
        '& .MuiTouchRipple-root span': {
            backgroundColor: theme.palette.button.ripple,
        },
        '&:hover': {
            backgroundColor: theme.palette.button.hover,
        },
    },
    buttonMargin: {
        marginRight: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            marginRight: theme.spacing(0.25),
        },
    },
    buttonText: {
        paddingLeft: theme.spacing(1),
    },
}));

const Button = ({ onClick, children, size, text, disableMargins }) => {
    const styles = useStyles();
    return (
        <>
            <MuiButton
                className={`${styles.button} ${
                    !disableMargins && styles.buttonMargin
                }`}
                size={size ? size : 'small'}
                onClick={onClick}
            >
                {children}
                {text && (
                    <Text
                        size="small"
                        component="span"
                        className={styles.buttonText}
                    >
                        {text}
                    </Text>
                )}
            </MuiButton>
        </>
    );
};

export default Button;
