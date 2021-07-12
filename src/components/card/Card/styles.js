import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    cardContainer: {
        padding: 0,
    },
    card: {
        '&:last-child': {
            paddingBottom: 0,
        },
        flex: 1,
        // background: 'red',
        paddingBottom: 0,
        backgroundColor: 'transparent',
        '&:hover': {
            animation: `$colorTransition 250ms ease-in forwards`,
        },
    },
    '@keyframes colorTransition': {
        '0%': {
            background: 'transparent',
        },
        '100%': {
            background: theme.palette.background.cardHover,
        },
    },
    cardHeader: {
        marginBottom: theme.spacing(1),
    },
    cardTitle: {
        fontWeight: '500',
        color: theme.palette.text.primary,
    },
    cardDate: {
        marginRight: theme.spacing(1),
        display: 'grid',
        placeItems: 'center',
        float: 'left',
    },
    cardButtonsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    cardButtons: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(2),
    },
    cardAppreciationButtons: {
        flexDirection: 'row',
    },
    cardCryptoListButtons: {
        justifyContent: 'flex-end',
        flex: 1,
    },
}));

export { useStyles };
