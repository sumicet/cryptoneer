import {
    CircularProgress,
    makeStyles,
    Typography,
    useTheme,
} from '@material-ui/core';
import { forwardRef, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import './FearAndGreedIndex.css';

const useStyles = makeStyles(theme => ({
    popover: {
        display: 'flex',
        flexDirection: 'row',
    },
}));

const FearAndGreedIndex = () => {
    const styles = useStyles();
    const theme = useTheme();

    const fearAndGreedIndex = useSelector(state => state.fearAndGreedIndex);

    // ******************* LOADING ******************
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (fearAndGreedIndex.loading) {
            setIsLoading(true);
        } else {
            if (!fearAndGreedIndex.loading) {
                setIsLoading(false);
            }
        }
    }, [fearAndGreedIndex.loading]);

    // ******************* FETCH DATA ******************

    const [fearAndGreedIndexData, setFearAndGreedIndexData] =
        useState(undefined);
    const { fetchFearAndGreedIndex } = useActions();
    useEffect(() => {
        fetchFearAndGreedIndex();
    }, [fetchFearAndGreedIndex]);

    // ******************* HANDLE ERRORS ******************

    useEffect(() => {
        if (fearAndGreedIndex.data && fearAndGreedIndex.error === null) {
            setFearAndGreedIndexData(fearAndGreedIndex.data);
        } else {
            if (fearAndGreedIndex.error) {
                console.error(fearAndGreedIndex.error, '// News.js');
            }
        }
    }, [fearAndGreedIndex]);

    // ******************* CHART ******************

    const getClassification = (value, date) => {
        const getName = () => {
            if (value >= 76) {
                return 'Extreme Greed';
            }
            if (55 <= value && value <= 75) {
                return 'Greed';
            }
            if (47 <= value && value <= 54) {
                return 'Neutral';
            }
            if (26 <= value && value <= 46) {
                return 'Fear';
            }
            return 'Extreme Fear';
        };

        return `Classification: <b>${getName()}</b><br />Value: <b>${value}</b><br />Date: <b>${date}</b>`;
    };

    // GTK https://stackoverflow.com/questions/45612603/how-can-i-use-chart-tooltip-formatter-in-react-highcharts
    function formatTooltip(tooltip, x = this.x, y = this.y) {
        return getClassification(parseInt(y), x);
    }

    const [options, setOptions] = useState(null);

    // TODO Continue from here

    useEffect(() => {
        if (!isLoading) {
            setOptions({
                chart: {
                    backgroundColor: 'transparent',
                    type: 'line',
                    styledMode: true,
                    // styledMode: true,
                },
                title: {
                    text: 'Fear & Greed Index Historical Data (Last 30 days)',
                    style: {
                        fontFamily: theme.typography.body1.fontFamily,
                        fontWeight: 700,
                        fontSize: theme.typography.body1.fontSize,
                        lineHeight: theme.typography.body1.lineHeight,
                        letterSpacing: theme.typography.body1.letterSpacing,
                        color: theme.palette.text.primary,
                    },
                },

                yAxis: {
                    labels: {
                        enabled: false,
                    },
                    title: {
                        text: null,
                    },
                },
                xAxis: {
                    className: 'highcharts-color-0',
                    lineColor: '#FF0000',
                    lineWidth: 1,
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
                    showLastLabel: true,
                    showFirstLabel: true,
                    labels: {
                        formatter: function () {
                            if (this.isFirst || this.isLast) return this.value;
                            else return this.value;
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
                tooltip: {
                    formatter: formatTooltip,
                    shared: true,
                    backgroundColor: 'pink',
                    borderWidth: 0,
                    shadow: false,
                    useHTML: true,
                    style: {
                        padding: 0,
                        fontFamily: `${theme.typography.body2.fontFamily}`,
                        fontWeight: `${theme.typography.body2.fontWeight}`,
                        fontSize: `${theme.typography.body2.fontSize}rem`,
                        lineHeight: `${theme.typography.body2.lineHeight}`,
                        letterSpacing: `${theme.typography.body2.letterSpacing}rem`,
                    },
                },
            });
        }
    }, [isLoading]);

    useEffect(() => {
        for (let child of document.getElementsByClassName(
            'highcharts-credits'
        )) {
            console.log(child);
            child.parentNode.removeChild(child);
        }
    }, []);

    return (
        <>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <div className={styles.popover}>
                    <div>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FearAndGreedIndex;
