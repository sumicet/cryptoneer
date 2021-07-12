import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0,
        overflow: 'hidden',
        '& a:last-of-type': {
            '& li': {
                borderBottom: 'none',
            },
        },
    },
}));

export { useStyles };
