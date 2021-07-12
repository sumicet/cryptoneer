import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    globalMetricsContainer: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1400px',
    },
    globalMetricsList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        flex: 1,
    },
    globalMetricsSentimentIcon: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
    globalMetricsCollapse: {
        overflow: 'hidden',
    },
    globalMetricsCollapseButton: {
        alignSelf: 'flex-start',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    globalMetricsCollapseWrapperInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
}));

export { useStyles };
