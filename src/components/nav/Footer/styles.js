import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    footerWrapper: {
        flex: 0,
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.light,
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        alignItems: 'flex-start',
    },
    footerField: {
        paddingBottom: theme.spacing(8),
        '&:last-child': {
            paddingTop: theme.spacing(8),
            paddingBottom: 0,
        },
    },
    footerList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:nth-child(3)': {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(4),
            },
        },
        '&:nth-child(4)': {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(4),
            },
        },
    },
    footerTextLink: {
        color: theme.palette.text.secondary,
    },
    footerListItem: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: theme.spacing(2),
    },
    footerListTitle: {
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 700,
    },
    footerListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        flex: 1,
    },
}));

export { useStyles };
