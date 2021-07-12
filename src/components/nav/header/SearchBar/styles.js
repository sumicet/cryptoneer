import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        background: theme.palette.background.cardHover,
        // background: 'transparent',
        // border: `0.5px solid ${theme.palette.text.secondary}`,
        '&:hover': {
            animation: `$colorTransition 250ms ${theme.transitions.easing.easeIn} forwards`,
        },
        marginLeft: 'auto',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    },
    '@keyframes colorTransition': {
        '0%': {
            background: theme.palette.background.cardHover,
        },
        '100%': {
            background: theme.palette.background.selected,
        },
    },
    searchBarIcon: {
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarInput: {
        paddingLeft: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
}));

export { useStyles };
