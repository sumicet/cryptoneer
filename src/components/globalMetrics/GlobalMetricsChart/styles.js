import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    chart: {
        overflow: 'auto',
        position: 'relative',
        flex: 1,
        display: 'flex',
    },
    root: {
        '& #container': {
            height: 400,
            maxWidth: 800,
            margin: '0 auto',
        },

        '& canvas': {
            width: '100% !important',
        },
    },
}));

export { useStyles };
