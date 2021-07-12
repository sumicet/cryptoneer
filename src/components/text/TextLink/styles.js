import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    linkText: {
        '&:hover': {
            color: theme.palette.text.accentPink,
        },
    },
}));

export { useStyles };
