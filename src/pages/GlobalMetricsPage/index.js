import {
    ButtonGroup,
    CircularProgress,
    Grid,
    useTheme,
} from '@material-ui/core';
import { useData } from '../../hooks/useData';
import GlobalMetricsChart from '../../components/globalMetrics/GlobalMetricsChart';
import { useState } from 'react';
import GlobalMetrics from '../../components/globalMetrics/GlobalMetrics';
import Text from '../../components/text/Text';
import Button from '../../components/buttons/Button';
import TextLink from '../../components/text/TextLink';
import { Launch } from '@material-ui/icons';
import { getFearAndGreedIndexColor } from '../../library/getFearAndGreedIndexColor';
import { useStyles } from './styles';

const buttonListFields = ['7D', '1M', '3M', '1Y', 'ALL'];

const GlobalMetricsPage = () => {
    const styles = useStyles();
    const theme = useTheme();

    const fearAndGreedIndex = useData(state => state.fearAndGreedIndex);

    const handleSourceClick = event => {
        event.preventDefault();
        window.open(
            'https://alternative.me/crypto/fear-and-greed-index/',
            '_blank'
        );
    };

    const [chartTimeRange, setChartTimeRange] = useState('3M');

    const handleChangeChartTimeRange = (event, field) => {
        event.preventDefault();
        setChartTimeRange(field);
    };

    return (
        <>
            <div className={styles.pageItem}>
                <GlobalMetrics collapse />
            </div>
            <div className={`${styles.pageItem} ${styles.pageBody}`}>
                {fearAndGreedIndex.loading ? (
                    <CircularProgress />
                ) : (
                    <Grid container className={styles.pageBodyContent}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={8}
                            lg={8}
                            className={styles.fearAndGreedChart}
                        >
                            <div className={styles.charButtonsWrapper}>
                                <ul className={styles.chartButtonList}>
                                    <ButtonGroup
                                        disableElevation
                                        variant="text"
                                        color="primary"
                                    >
                                        {buttonListFields.map(field => (
                                            <li
                                                className={
                                                    styles.chartButtonItem
                                                }
                                            >
                                                <Button
                                                    onClick={event =>
                                                        handleChangeChartTimeRange(
                                                            event,
                                                            field
                                                        )
                                                    }
                                                    disableMargins
                                                    className={
                                                        styles.chartButton
                                                    }
                                                    style={
                                                        field === chartTimeRange
                                                            ? {
                                                                  backgroundColor:
                                                                      theme
                                                                          .palette
                                                                          .background
                                                                          .selected,
                                                              }
                                                            : {}
                                                    }
                                                    TextProps={{
                                                        className: `${styles.chartButtonText}`,
                                                    }}
                                                >
                                                    {field}
                                                </Button>
                                            </li>
                                        ))}
                                    </ButtonGroup>
                                </ul>
                                <div
                                    className={
                                        styles.fearAndGreedIndexTodayWrapper
                                    }
                                >
                                    <div
                                        className={
                                            styles.fearAndGreedIndexToday
                                        }
                                    >
                                        <Text
                                            size="small"
                                            style={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            Today:&nbsp;
                                        </Text>
                                        <Text
                                            size="small"
                                            style={{
                                                color: getFearAndGreedIndexColor(
                                                    fearAndGreedIndex.data[0]
                                                        .value
                                                ),
                                                fontWeight: 700,
                                            }}
                                        >
                                            {
                                                fearAndGreedIndex.data[0]
                                                    .value_classification
                                            }
                                        </Text>

                                        <Text
                                            size="small"
                                            style={{
                                                fontWeight: 700,
                                            }}
                                        >
                                            &nbsp;&#8226;&nbsp;
                                        </Text>
                                        <Text
                                            size="small"
                                            style={{
                                                color: getFearAndGreedIndexColor(
                                                    fearAndGreedIndex.data[0]
                                                        .value
                                                ),
                                                fontWeight: 700,
                                            }}
                                        >
                                            {fearAndGreedIndex.data[0].value}
                                        </Text>
                                    </div>
                                </div>
                            </div>
                            <GlobalMetricsChart
                                stepSize={
                                    ['ALL', '1Y', '3M'].includes(chartTimeRange)
                                        ? 20
                                        : 5
                                }
                                data={
                                    chartTimeRange === 'ALL'
                                        ? fearAndGreedIndex.data
                                              .slice()
                                              .reverse()
                                        : chartTimeRange === '1Y'
                                        ? fearAndGreedIndex.data
                                              .slice()
                                              .filter(
                                                  data =>
                                                      data.timestamp * 1000 >=
                                                      new Date().getTime() -
                                                          1000 *
                                                              60 *
                                                              60 *
                                                              24 *
                                                              365
                                              )
                                              .reverse()
                                        : chartTimeRange === '3M'
                                        ? fearAndGreedIndex.data
                                              .slice()
                                              .filter(
                                                  data =>
                                                      data.timestamp * 1000 >=
                                                      new Date().getTime() -
                                                          1000 *
                                                              60 *
                                                              60 *
                                                              24 *
                                                              30 *
                                                              3
                                              )
                                              .reverse()
                                        : chartTimeRange === '1M'
                                        ? fearAndGreedIndex.data
                                              .slice()
                                              .filter(
                                                  data =>
                                                      data.timestamp * 1000 >=
                                                      new Date().getTime() -
                                                          1000 *
                                                              60 *
                                                              60 *
                                                              24 *
                                                              30
                                              )
                                              .reverse()
                                        : fearAndGreedIndex.data
                                              .slice()
                                              .filter(
                                                  data =>
                                                      data.timestamp * 1000 >=
                                                      new Date().getTime() -
                                                          1000 *
                                                              60 *
                                                              60 *
                                                              24 *
                                                              7
                                              )
                                              .reverse()
                                }
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            className={styles.fearAndGreedInfo}
                        >
                            <Text
                                size="large"
                                className={styles.fearAndGreedInfoItem}
                            >
                                What is the Fear and Greed Index?
                            </Text>
                            <Text
                                size="medium"
                                className={styles.fearAndGreedInfoItem}
                            >
                                Each day, we analyze emotions and sentiments
                                from different sources and crunch them into one
                                simple number: The Fear & Greed Index for
                                Bitcoin and other large cryptocurrencies.
                            </Text>
                            <Text
                                size="large"
                                className={styles.fearAndGreedInfoItem}
                            >
                                Data sources
                            </Text>
                            <ul
                                className={`${styles.chartDataSourceList} ${styles.fearAndGreedInfoItem}`}
                            >
                                <Text size="medium">
                                    <li>25%: Volatility</li>
                                </Text>

                                <Text size="medium">
                                    <li>25%: Market Momentum/Volume</li>
                                </Text>

                                <Text size="medium">
                                    <li>15%: Social Media</li>
                                </Text>

                                <Text size="medium">
                                    <li>15%: Surveys</li>
                                </Text>

                                <Text size="medium">
                                    <li>10%: Dominance</li>
                                </Text>

                                <Text size="medium">
                                    <li>10%: Trends</li>
                                </Text>
                            </ul>
                            <div
                                className={`${styles.infoSourceLink} ${styles.fearAndGreedInfoItem}`}
                            >
                                <TextLink
                                    onClick={handleSourceClick}
                                    TextProps={{
                                        size: 'small',
                                    }}
                                >
                                    Source: alternative.me{' '}
                                    <Launch
                                        style={{
                                            width: theme.sizing.icon,
                                            height: theme.sizing.icon,
                                            alignSelf: 'center',
                                            marginLeft: theme.spacing(0.5),
                                        }}
                                    />
                                </TextLink>
                            </div>
                        </Grid>
                    </Grid>
                )}
            </div>
        </>
    );
};

export default GlobalMetricsPage;
