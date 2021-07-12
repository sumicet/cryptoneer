import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    error: {
        flex: 1,
        display: 'flex',
        background: theme.palette.error.dark,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorIcon: {
        color: theme.palette.text.primary,
        marginRight: theme.spacing(1),
    },
}));

export { useStyles };
