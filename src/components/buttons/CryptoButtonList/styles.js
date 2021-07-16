import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    cryptoButtonList: {
        display: 'flex',
        flexDirection: 'row',
        listStyleType: 'none',
        alignItems: 'center',

        [theme.breakpoints.only('xs')]: {
            '& li': {
                marginRight: theme.spacing(1),
                height: theme.sizing.icon,
            },
        },
    },
}));

export { useStyles };
