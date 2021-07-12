import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    navItemContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column',
        },
    },
    navDrawerHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: theme.spacing(2),
    },
    logo: {
        flex: 1,
    },
    navSearchBar: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            flex: 1,
        },

        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
            width: '100%',
        },
    },
    navLinkWrapper: {
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
    navLink: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        '&:hover': {
            animation: `$colorTransition 250ms ${theme.transitions.easing.easeIn} forwards`,
        },
    },
    '@keyframes colorTransition': {
        '0%': {
            color: theme.palette.text.primary,
        },
        '100%': {
            color: theme.palette.text.accentPink,
        },
    },
    navItemList: {
        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
        },
    },
}));

export { useStyles };
