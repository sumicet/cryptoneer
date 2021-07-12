import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    nav: {
        flex: 0,
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.dark,
    },
    navToolbar: {
        display: 'flex',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    navDrawerToggleButton: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    navDrawer: {
        flex: 1,
        background: 'transparent',
    },
    navDrawerPaper: {
        background: theme.palette.background.dark,
        padding: theme.spacing(2),
    },
}));

export { useStyles };
