import { Button as MuiButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

/**
 * @param children an icon.
 * @param size "small", "large". Default "small".
 */

const useStyles = makeStyles(theme => ({
    button: {
        color: theme.palette.text.secondary,
        background: 'transparent',
        marginRight: theme.spacing(1),
        padding: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            marginRight: theme.spacing(0.25),
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
    buttonText: {
        paddingLeft: theme.spacing(1),
        color: theme.palette.text.secondary,
        // fontWeight: 300,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
    },
}));

const Button = ({ onClick, children, size, text }) => {
    const styles = useStyles();
    return (
        <>
            <MuiButton
                className={styles.button}
                size={size ? size : 'small'}
                onClick={onClick}
            >
                {children}
                {text && (
                    <Typography
                        className={styles.buttonText}
                        variant="body2"
                        component="span"
                    >
                        {text}
                    </Typography>
                )}
            </MuiButton>
        </>
    );
};

export default Button;
