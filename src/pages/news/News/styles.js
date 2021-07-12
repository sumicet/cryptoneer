import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageItem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    pageBody: {
        width: '100%',
        background: theme.palette.background.dark,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
}));

export { useStyles };
