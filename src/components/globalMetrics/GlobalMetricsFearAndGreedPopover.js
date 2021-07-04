import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { forwardRef } from 'react';
import Popover from '../modals/Popover';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const useStyles = makeStyles(theme => ({
    popover: {
        display: 'flex',
        flexDirection: 'row',
    },
    fearAndGreedHistoricalItem: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: theme.spacing(1),
        '&:last-child': {
            paddingBottom: 0,
        },
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },
}));

const GlobalMetricsFearAndGreedPopover = forwardRef((props, ref) => {
    const { handlePopoverClose, anchorEl, fearAndGreedIndexData } = props;
    const styles = useStyles();
    const theme = useTheme();

    const getClassification = value => {
        const description = ' - ' + value;

        if (value >= 76) {
            return 'Extreme Greed' + description;
        }
        if (55 <= value && value <= 75) {
            return 'Greed' + description;
        }
        if (47 <= value && value <= 54) {
            return 'Neutral' + description;
        }
        if (26 <= value && value <= 46) {
            return 'Fear' + description;
        }
        return 'Extreme Fear' + description;
    };

    // GTK https://stackoverflow.com/questions/45612603/how-can-i-use-chart-tooltip-formatter-in-react-highcharts
    function formatTooltip(tooltip, x = this.x, y = this.y) {
        return getClassification(parseInt(y));
    }

    const options = {
        title: {
            text: 'Fear & Greed Index Historical Data (Last 30 days)',
        },
        chart: {
            backgroundColor: {
                linearGradient: [0, 0, 500, 500],
                stops: [
                    [0, 'rgb(255, 255, 255)'],
                    [1, 'rgb(200, 200, 255)'],
                ],
            },
            type: 'line',
        },
        yAxis: {
            labels: {
                formatter: function (e) {
                    return getClassification(e.value);
                },
            },
        },
        series: [
            {
                data: fearAndGreedIndexData
                    .map(data => {
                        return {
                            name: data.value_classification.toString(),
                            y: parseInt(data.value),
                        };
                    })
                    .reverse(),
                showInLegend: false,
                zones: [
                    {
                        value: 25,
                        color: 'red',
                        fillColor: 'pink',
                    },
                    {
                        value: 46,
                        color: 'orange',
                    },
                    {
                        value: 54,
                        color: 'grey',
                    },
                    {
                        value: 75,
                        color: 'lime',
                    },
                    {
                        value: 100,
                        color: 'green',
                    },
                ],
            },
        ],

        xAxis: {
            categories: fearAndGreedIndexData
                .map(
                    data =>
                        new Date(
                            parseInt(data.timestamp) * 1000
                        ).toLocaleString('default', {
                            month: 'long',
                        }) +
                        ' ' +
                        new Date(parseInt(data.timestamp) * 1000)
                            .getDate()
                            .toString()
                )
                .reverse(),
        },
        tooltip: {
            formatter: formatTooltip,
            shared: true,
        },
    };

    return (
        <div ref={ref} onMouseLeave={handlePopoverClose}>
            {/* This is a custom popover. The MuiPopover is ../modals/Popover.js */}
            <Popover anchor={anchorEl} onClose={handlePopoverClose}>
                <div className={styles.popover}>
                    <div>
                        {fearAndGreedIndexData.map(data => (
                            <div
                                className={styles.fearAndGreedHistoricalItem}
                                key={data.timestamp}
                            >
                                <Typography
                                    className={`${styles.globalMetricsText}`}
                                    display="inline"
                                    variant="body2"
                                >
                                    {new Date(
                                        parseInt(data.timestamp) * 1000
                                    ).toLocaleString('default', {
                                        month: 'long',
                                    })}{' '}
                                    {new Date(parseInt(data.timestamp) * 1000)
                                        .getDate()
                                        .toString()}
                                    {': '}
                                    &nbsp;
                                </Typography>
                                <Typography
                                    className={`${styles.globalMetricsText}`}
                                    display="inline"
                                    variant="body2"
                                    style={{
                                        color: data.value_classification
                                            .toString()
                                            .toLowerCase()
                                            .includes('fear')
                                            ? theme.palette.icon.bearish
                                            : data.value_classification
                                                  .toString()
                                                  .toLowerCase()
                                                  .includes('greed')
                                            ? theme.palette.icon.bullish
                                            : theme.palette.text.accentLight,
                                    }}
                                >
                                    {data.value_classification}
                                </Typography>
                            </div>
                        ))}
                    </div>
                    <div className={styles.popoverGraph}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                </div>
            </Popover>
        </div>
    );
});

export default GlobalMetricsFearAndGreedPopover;
