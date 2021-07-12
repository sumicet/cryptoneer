import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    list: {
        padding: 0,
        overflow: 'hidden',
        width: '100%',
        background: theme.palette.background.dark,
        borderRadius: theme.shape.borderRadius,
        '& a:last-of-type': {
            '& li': {
                borderBottom: 'none',
            },
        },
    },
}));

export { useStyles };
