import { useTheme } from '@material-ui/core';
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { createRef } from 'react';
import { getFearAndGreedIndexColor } from '../../../library';
import { useStyles } from './styles';

const GlobalMetricsChart = ({ data, stepSize }) => {
    const styles = useStyles();
    const theme = useTheme();

    const canvasRef = createRef(null);

    const LineChart = ({ data, title }) => {
        const getName = value =>
            value < 26
                ? 'Extreme Fear'
                : value < 47
                ? 'Fear'
                : value < 55
                ? 'Neutral'
                : value < 76
                ? 'Greed'
                : 'Extreme Greed';

        const config = {
            type: 'line',
            scaleFontColor: 'white',
            data: {
                labels: data.map(
                    d =>
                        new Date(d.timestamp * 1000).getDate() +
                        ' ' +
                        new Date(d.timestamp * 1000).toLocaleString('default', {
                            month: 'short',
                        })
                ),
                datasets: [
                    {
                        type: 'line',
                        label: title,
                        data: data.map(d => d.value),
                        borderColor: theme.palette.text.accentPink,
                        lineTension: 0.1,
                        pointBackgroundColor: theme.palette.text.primary,
                        pointHitRadius: 0,
                        pointRadius: 0,
                        pointBorderWidth: 0,
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                    hover: {
                        mode: 'index',
                        intersect: false,
                        // axis: 'x',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: theme.palette.background.cardLight,
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
                                )}`;
                            },
                            afterTitle: function (item) {
                                return `Value: ${item[0].formattedValue} out of 100`;
                            },
                            label: () => null,
                        },
                        axis: 'x',
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
                            stepSize: stepSize,
                        },
                        grid: {
                            drawBorder: false,
                            color: function (context) {
                                return theme.palette.divider;
                            },
                        },
                        grace: '5%',
                        // offset: true,
                        max:
                            data
                                .map(d => d.value)
                                .reduce((a, b) => Math.max(a, b)) + 2,
                        min:
                            data
                                .map(d => d.value)
                                .reduce((a, b) => Math.min(a, b)) - 2,
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
                        // don't render all ticks, only a few equally distanced
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
                                } else if (
                                    index % density === 0 &&
                                    // don't display the tick twice for the last point
                                    index + density < axis.ticks.length - 1
                                ) {
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
            plugins: [
                {
                    // color points according to y value
                    // display vertical dotted line on hover
                    afterDraw: chart => {
                        if (chart.tooltip?._active?.length) {
                            let x = chart.tooltip._active[0].element.x;
                            let y = chart.tooltip._active[0].element.y;

                            let yAxis = chart.scales.y;
                            let ctx = chart.ctx;
                            ctx.setLineDash([5, 5]);

                            ctx.save();

                            ctx.beginPath();
                            ctx.moveTo(x, yAxis.top);
                            ctx.lineTo(x, yAxis.bottom);
                            ctx.lineWidth = 1;
                            ctx.strokeStyle = theme.palette.text.primary;
                            ctx.stroke();
                            ctx.restore();

                            ctx.beginPath();
                            const value =
                                chart.tooltip._active[0].element.parsed.y;
                            ctx.fillStyle = getFearAndGreedIndexColor(value);
                            ctx.arc(x, y, 5, 0, 2 * Math.PI, true);

                            ctx.fill();

                            ctx.beginPath();
                            ctx.fillStyle = 'rgba(255,255,255, 0.2)';
                            ctx.arc(x, y, 10, 0, 2 * Math.PI, true);
                            ctx.fill();
                        }
                    },
                },
            ],
        };

        useEffect(() => {
            let chart = new Chart(canvasRef.current.getContext('2d'), config);
        }, [canvasRef.current]);

        return <canvas ref={canvasRef} />;
    };

    return (
        <>
            <div className={styles.chart}>
                <LineChart data={data} color="white" />
            </div>
        </>
    );
};

export default GlobalMetricsChart;
