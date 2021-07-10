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

/**
 *
 * @param children
 * @param size
 * @param text
 * @param TextProps
 * @param disableMargins
 * @param props other props passed down to MuiButton
 */
const Button = props => {
    const { children, size, text, disableMargins, TextProps, className } =
        props;
    const styles = useStyles();
    return (
        <>
            <MuiButton
                {...props}
                className={`${styles.button} ${
                    !disableMargins ? styles.buttonMargin : ''
                } ${className ? className : ''}`}
                size={size ? size : 'small'}
            >
                {children}
                {text && (
                    <Text
                        {...TextProps}
                        size="small"
                        component="span"
                        className={`${styles.buttonText} ${
                            TextProps ? TextProps.className : ''
                        }`}
                    >
                        {text}
                    </Text>
                )}
            </MuiButton>
        </>
    );
};

export default Button;
