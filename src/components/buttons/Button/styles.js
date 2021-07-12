import { makeStyles } from '@material-ui/core';

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
        textTransform: 'none',
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

export { useStyles };
