import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    pageItem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    pageBody: {
        width: '100%',
    },
    pageBodyContent: {},
    fearAndGreedChart: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    chartButtonList: {
        display: 'flex',
        flexDirection: 'row',
        background: `linear-gradient(${theme.palette.background.cardLight}, ${theme.palette.background.cardDark})`,
        width: 'max-content',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
    chartButtonItem: {
        listStyleType: 'none',
        borderRight: `0px !important`,
    },
    charButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: theme.spacing(2),
    },
    fearAndGreedIndexTodayWrapper: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    fearAndGreedIndexToday: {
        background: `linear-gradient(${theme.palette.background.cardLight}, ${theme.palette.background.cardDark})`,
        borderRadius: theme.shape.borderRadius,
        height: '100%',
        width: 'max-content',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
    },
    fearAndGreedInfo: {
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            paddingLeft: theme.spacing(6),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(6),
        },
    },
    chartDataSourceList: {
        listStylePosition: 'inside',
        textAlign: 'left',
    },
    infoSourceLink: {
        justifyContent: 'flex-end',
        display: 'flex',
    },
    fearAndGreedInfoItem: {
        marginBottom: theme.spacing(1),
        '&:last-child': {
            marginBottom: 0,
        },
    },
    chartButton: {
        margin: 0,
        borderRadius: 0,
        height: '100%',
        width: '100%',
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    chartButtonText: {
        fontWeight: 700,
    },
}));

export { useStyles };
