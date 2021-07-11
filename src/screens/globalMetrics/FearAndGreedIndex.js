import { CircularProgress, makeStyles, useTheme } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './FearAndGreedIndex.css';
import { useData } from '../../hooks/useData';

import Chart from 'chart.js/auto';
import { createRef } from 'react';

const useStyles = makeStyles(theme => ({
    chartContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
    },
    chart: {
        overflow: 'auto',
        position: 'relative',
        flex: 1,
        display: 'flex',
        maxWidth: '800px',
        background: `linear-gradient(${theme.palette.background.cardLight}, ${theme.palette.background.cardDark})`,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
    },
}));

const FearAndGreedIndex = () => {
    const styles = useStyles();
    const theme = useTheme();

    const fearAndGreedIndex = useData(state => state.fearAndGreedIndex);

    const canvasRef = createRef(null);

    const BarChart = ({ data, title, color }) => {
        const getName = value => {
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

        useEffect(() => {
            let ctx = canvasRef.current.getContext('2d');
            let myChart = new Chart(canvasRef.current, {
                type: 'scatter',

                scaleFontColor: 'white',
                data: {
                    labels: data.map(
                        d =>
                            new Date(d.timestamp * 1000).getDate() +
                            ' ' +
                            new Date(d.timestamp * 1000).toLocaleString(
                                'default',
                                { month: 'short' }
                            )
                    ),
                    datasets: [
                        {
                            type: 'line',
                            label: title,
                            data: data.map(d => d.value),
                            borderColor: theme.palette.text.accentPink,
                            tension: 0.1,
                            pointBackgroundColor: theme.palette.text.primary,
                            pointHitRadius: 10,
                            pointRadius: 3,
                            pointBorderWidth: 0,
                        },
                    ],
                },
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            backgroundColor: theme.palette.background.dark,
                            titleFont: {
                                family: "Inter, -apple-system, BlinkMacSystemFont, 'segoe ui', Roboto, Helvetica, Arial, sans-serif",
                            },
                            titleColor: theme.palette.text.primary,
                            titleSpacing: 6,
                            titleMarginBottom: 0,
                            callbacks: {
                                title: function (item) {
                                    return `${item[0].label}: ${getName(
                                        parseInt(item[0].formattedValue)
                                    )}\nValue: ${
                                        item[0].formattedValue
                                    } out of 100`;
                                },
                                label: () => null,
                            },
                        },
                    },
                    scales: {
                        y: {
                            gridLines: {
                                display: false,
                                drawBorder: false, //hide the chart edge line
                            },
                            ticks: {
                                display: false,
                            },
                            grid: {
                                drawBorder: false,
                                color: function (context) {
                                    return theme.palette.divider;
                                },
                            },
                            // stacked: true,
                        },
                        x: {
                            type: 'category',
                            ticks: {
                                color: theme.palette.text.primary,
                            },
                            grid: {
                                drawBorder: false,
                                color: function (context) {
                                    return 'transparent';
                                },
                            },
                            afterBuildTicks: function (axis) {
                                // max possible ticks
                                console.log(axis);
                                const totElements = 5;

                                if (axis.ticks.length <= totElements) {
                                    return axis.ticks;
                                }

                                // this number is used to display a tick every n ticks
                                const density = Math.trunc(
                                    axis.ticks.length / totElements
                                );

                                if (isNaN(density)) {
                                    console.warn('Nan in ticks');
                                    return axis.ticks;
                                }

                                axis.ticks = axis.ticks.filter((t, index) => {
                                    // always show the first and the last tick
                                    if (
                                        index === 0 ||
                                        index === axis.ticks.length - 1
                                    ) {
                                        return t;
                                    } else if (index % density === 0) {
                                        console.log(index);
                                        return t;
                                    }
                                    return '';
                                });

                                return;
                            },
                        },
                    },
                    responsive: true,
                    maintainAspectRatio: true,
                },
            });
        }, [color, data, title]);

        const updateChartSize = () => {
            // canvasRef.current.style.width = '100% !important';
            // canvasRef.current.style.height = '100% !important';
        };

        useEffect(() => {
            window.addEventListener('resize', () => updateChartSize());
            return () => {
                window.removeEventListener('resize', () => updateChartSize());
            };
        }, []);

        return <canvas ref={canvasRef} />;
    };

    return (
        <>
            {fearAndGreedIndex.loading ? (
                <CircularProgress />
            ) : (
                <div className={styles.chartContainer}>
                    <div className={styles.chart}>
                        <BarChart
                            title="Fear and Greed Index"
                            data={fearAndGreedIndex.data.slice().reverse()}
                            color="white"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default FearAndGreedIndex;
