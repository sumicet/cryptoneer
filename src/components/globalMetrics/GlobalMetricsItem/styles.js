import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    globalMetricsItemWrapper: {}, // needed for ref
    globalMetricsItem: {
        padding: 0,
        cursor: 'default',
    },
    globalMetricsItemContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    globalMetricsItemButton: {
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            color: `${theme.palette.text.accentLight} !!important`,
        },
    },
    globalMetricsItemButtonRoot: {
        lineHeight: 0,
        minWidth: 0,
        textTransform: 'none',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        verticalAlign: 'unset',

        '& .MuiButton-label': {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
        },
        '&:hover span > p': {
            color: `${theme.palette.text.accentPink} !important`,
        },
        '&:hover span > a > p': {
            color: `${theme.palette.text.accentLightPink} !important`,
        },
        '&:hover': {
            background: 'transparent',
        },
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },
    globalMetricsTextData: {
        color: theme.palette.text.accentLight,
    },
    globalMetricsLaunchIcon: {
        width: theme.typography.body2.fontSize,
        height: theme.typography.body2.fontSize,
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(0.5),
    },
    globalMetricsLink: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: `${theme.palette.text.primary} !important`,
    },
    remoteSpaces: {
        padding: 0,
        margin: 0,
    },
}));

export { useStyles };
