import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    logoContainer: {
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
    logo: {
        width: `${
            parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)[0]) *
            theme.typography.h6.lineHeight
        }rem`,
        height: `${
            parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)[0]) *
            theme.typography.h6.lineHeight
        }rem`,
        marginRight: theme.spacing(2),
    },
}));

export { useStyles };
