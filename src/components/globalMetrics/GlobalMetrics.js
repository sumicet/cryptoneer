import {
    CircularProgress,
    makeStyles,
    Typography,
    useTheme,
    List,
    Divider,
    useMediaQuery,
} from '@material-ui/core';
import { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { ReactComponent as Bear } from '../../svg/other/Bear.svg';
import { ReactComponent as Bull } from '../../svg/other/Bull.svg';
import Popover from '../modals/Popover';
import GlobalMetricsItem from './GlobalMetricsItem';

const GlobalMetrics = () => {
    const [globalMetricsHeight, setGlobalMetricsHeight] = useState();

    const useStyles = makeStyles(theme => ({
        globalMetricsContainer: {
            display: 'flex',
            flexDirection: 'row',
            maxWidth: '1400px',
        },
        globalMetricsList: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
            alignContent: 'row',
            overflow: 'hidden',
            height: globalMetricsHeight,
        },
        globalMetricsText: {
            color: theme.palette.text.primary,
            fontSize: `${theme.typography.fontSize * 0.9}px`,
            fontWeight: 700,
            display: 'inline-block',
            whiteSpace: 'nowrap',
        },
        globalMetricsSentimentIcon: {
            display: 'flex',
            alignItems: 'center',
        },
        globalMetrics: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        },
        fearAndGreedHistoricalItem: {
            display: 'flex',
            flexDirection: 'row',
            paddingBottom: theme.spacing(1),
            '&:last-child': {
                paddingBottom: 0,
            },
        },
    }));

    const globalMetrics = useSelector(state => state.globalMetrics);
    const fearAndGreedIndex = useSelector(state => state.fearAndGreedIndex);

    // ******************* LOADING ******************
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (globalMetrics.loading || fearAndGreedIndex.loading) {
            setIsLoading(true);
        } else {
            if (!globalMetrics.loading && !fearAndGreedIndex.loading) {
                setIsLoading(false);
            }
        }
    }, [globalMetrics.loading, fearAndGreedIndex.loading]);

    // ******************* FETCH DATA ******************

    const [globalMetricsData, setGlobalMetricsData] = useState(undefined);
    const [fearAndGreedIndexData, setFearAndGreedIndexData] =
        useState(undefined);
    const { fetchGlobalMetrics, fetchFearAndGreedIndex } = useActions();
    useEffect(() => {
        fetchGlobalMetrics();
        fetchFearAndGreedIndex();
    }, [fetchGlobalMetrics, fetchFearAndGreedIndex]);

    // ******************* HANDLE ERRORS ******************

    useEffect(() => {
        if (globalMetrics.data && globalMetrics.error === null) {
            setGlobalMetricsData(globalMetrics.data);
        } else {
            if (globalMetrics.error) {
                console.error(globalMetrics.error, '// News.js');
            }
        }
    }, [globalMetrics]);

    useEffect(() => {
        if (fearAndGreedIndex.data && fearAndGreedIndex.error === null) {
            setFearAndGreedIndexData(fearAndGreedIndex.data);
        } else {
            if (fearAndGreedIndex.error) {
                console.error(fearAndGreedIndex.error, '// News.js');
            }
        }
    }, [fearAndGreedIndex]);

    const styles = useStyles();
    const theme = useTheme();

    // ******************* SET HEIGHT SENTIMENT ICON ******************

    const globalMetricsItemRef = useCallback(node => {
        if (node !== null) {
            // node = ref.current
            setGlobalMetricsHeight(node.getBoundingClientRect().height);
        }
    }, []);

    // ******************* POPOVER ******************

    const [anchorEl, setAnchorEl] = useState(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    // ******************* RESPONSIVENESS ******************
    // detect if all global metrics are on one line
    // if not display dropdown arrow
    const [areAllGlobalMetricsOnOneLine, setAreAllGlobalMetricsOnOneLine] =
        useState(true);

    // TODO: check why this turns NaN when the size is xs
    useEffect(() => {
        console.log(areAllGlobalMetricsOnOneLine);
    }, [areAllGlobalMetricsOnOneLine]);

    useEffect(() => {
        const updateSize = () => {
            // compare list (which is the container) width
            // with the sum of all children width (which are the metrics)
            // to see if they're all on the same line or not
            const node = document.getElementById('list');
            let sum = 0;
            for (let child of node.children) {
                sum += child.getBoundingClientRect().width;
            }
            const oneLine = node.getBoundingClientRect().width === sum;

            if (oneLine !== areAllGlobalMetricsOnOneLine) {
                setAreAllGlobalMetricsOnOneLine(oneLine);
            }
        };
        window.addEventListener('resize', () => updateSize());
        return window.removeEventListener('resize', () => updateSize());
    }, [areAllGlobalMetricsOnOneLine]);

    return (
        <div className={styles.globalMetricsContainer}>
            {isLoading && <CircularProgress />}
            {!isLoading && globalMetricsData && (
                <div className={styles.globalMetrics}>
                    <div className={styles.globalMetricsSentimentIcon}>
                        <Bull
                            height={`${globalMetricsHeight}px`}
                            fill={theme.palette.icon.bullish}
                        />
                        {/* <Bear fill={theme.palette.icon.bearish} /> */}
                    </div>
                    <List
                        disablePadding
                        className={styles.globalMetricsList}
                        id="list"
                    >
                        <GlobalMetricsItem
                            title="News"
                            color={theme.palette.icon.bullish}
                        >
                            91% Bullish
                        </GlobalMetricsItem>
                        {/* news sentiment percentage + news sentiment */}

                        <Divider orientation="vertical" flexItem />
                        {/* fear and green index */}
                        <div
                            aria-owns={
                                anchorEl ? 'mouse-over-popover' : undefined
                            }
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                            ref={globalMetricsItemRef}
                        >
                            <GlobalMetricsItem
                                title="Fear & Greed Index"
                                color={
                                    fearAndGreedIndexData[0].value_classification
                                        .toString()
                                        .toLowerCase()
                                        .includes('fear')
                                        ? theme.palette.icon.bearish
                                        : fearAndGreedIndexData[0].value_classification
                                              .toString()
                                              .toLowerCase()
                                              .includes('greed')
                                        ? theme.palette.icon.bullish
                                        : theme.palette.text.accentLight
                                }
                                redirectURL="https://alternative.me/crypto/fear-and-greed-index/"
                            >
                                {fearAndGreedIndexData[0].value_classification}
                            </GlobalMetricsItem>
                        </div>
                        {/* fear and greed index popover */}
                        <Popover anchor={anchorEl} onClose={handlePopoverClose}>
                            {fearAndGreedIndexData.map(data => (
                                <div
                                    className={
                                        styles.fearAndGreedHistoricalItem
                                    }
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
                                        {new Date(
                                            parseInt(data.timestamp) * 1000
                                        )
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
                                                : theme.palette.text
                                                      .accentLight,
                                        }}
                                    >
                                        {data.value_classification}
                                    </Typography>
                                </div>
                            ))}
                        </Popover>
                        <Divider orientation="vertical" flexItem />
                        <GlobalMetricsItem title="Dominance">
                            {'BTC ' + globalMetricsData.btcDominance.toFixed(1)}
                            % ETH {globalMetricsData.ethDominance.toFixed(1)}%
                        </GlobalMetricsItem>
                        <Divider orientation="vertical" flexItem />
                        <GlobalMetricsItem title="Active Currencies">
                            {globalMetricsData.activeCurrencies}
                        </GlobalMetricsItem>
                        <Divider orientation="vertical" flexItem />
                        <GlobalMetricsItem title="Active Markets">
                            {globalMetricsData.activeMarkets}
                        </GlobalMetricsItem>
                        <Divider orientation="vertical" flexItem />
                        {/* add , every 3 digits from the end => nice lookin number */}
                        <GlobalMetricsItem title="24h Volume">
                            $
                            {globalMetricsData.values.USD.totalVolume24h
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </GlobalMetricsItem>
                        <Divider orientation="vertical" flexItem />

                        <GlobalMetricsItem title="Market Cap">
                            $
                            {globalMetricsData.values.USD.totalMarketCap
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        </GlobalMetricsItem>
                    </List>
                    {!areAllGlobalMetricsOnOneLine && <div>ye</div>}
                </div>
            )}
        </div>
    );
};

export default GlobalMetrics;
