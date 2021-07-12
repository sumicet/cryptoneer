import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    large: {
        fontWeight: 700,
        color: theme.palette.text.primary,
        display: 'flex',
    },
    medium: {
        fontWeight: 500,
        color: theme.palette.text.primary,
        display: 'flex',
    },
    small: {
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        color: theme.palette.text.secondary,
        fontWeight: 400,
        display: 'flex',
    },
}));

export { useStyles };
