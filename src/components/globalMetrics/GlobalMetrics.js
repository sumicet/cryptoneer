import {
    CircularProgress,
    makeStyles,
    Typography,
    useTheme,
    Divider,
    Collapse,
    Grid,
    useMediaQuery,
} from '@material-ui/core';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
// eslint-disable-next-line
import { ReactComponent as Bear } from '../../svg/other/Bear.svg';
import { ReactComponent as Bull } from '../../svg/other/Bull.svg';
import Popover from '../modals/Popover';
import GlobalMetricsItem from './GlobalMetricsItem';
import Button from '../buttons/Button';
import {
    ArrowForwardIos,
    ExpandMore,
    KeyboardArrowRight,
} from '@material-ui/icons';
import { useRef } from 'react';
import { createRef } from 'react';

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
            justifyContent: 'flex-start',
            overflow: 'hidden',
            flex: 1,
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
            height: globalMetricsHeight,
            alignSelf: 'flex-start',
        },
        globalMetrics: {
            overflow: 'hidden',
        },
        globalMetricsWrapperInner: {
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
        button: {
            alignSelf: 'flex-start',
            width: globalMetricsHeight,
            height: globalMetricsHeight,
        },
        flex: {
            display: 'flex',
            flex: 1,
        },
        popover: {
            pointerEvents: 'none',
        },
        fearAndGreedIndexIcon: {
            width: theme.typography.body2.fontSize,
            height: theme.typography.body2.fontSize,
            color: theme.palette.text.primary,
            marginLeft: theme.spacing(0.5),
            // width: '100%',
            alignSelf: 'center',
            justifySelf: 'flex-end',
        },
        fearAndGreedIndexData: {
            display: 'flex',
            flexDirection: 'row',
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

    // ******************* GLOBAL METRICS CARD HEIGHT ******************

    // this is the height of the
    // icon (bull/bear)
    // global metrics cards
    // collapsed height
    // const globalMetricsItemRef = useCallback(node => {
    //     if (node !== null) {
    //         // node = ref.current
    //         setGlobalMetricsHeight(node.getBoundingClientRect().height);
    //     }
    // }, []);

    const globalMetricsItemRef = createRef();

    useEffect(() => {
        if (globalMetricsItemRef.current) {
            setGlobalMetricsHeight(
                globalMetricsItemRef.current.getBoundingClientRect().height
            );
        }
    }, [globalMetricsItemRef]);

    // ******************* FEAR & GREED INDEX POPOVER ******************

    const [anchorEl, setAnchorEl] = useState(null);
    const popoverRef = useRef(null);

    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target) &&
                anchorEl
            ) {
                handlePopoverClose();
            }
        }
        // Bind the event listener
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [popoverRef, anchorEl]);

    const [showGlobalMetrics, setShowGlobalMetrics] = useState(false);

    // ******************* RESPONSIVENESS ******************

    // LEARN Material UI doesn't forward refs so use the ref on containers.

    const isResolutionLG = useMediaQuery(theme => theme.breakpoints.up('lg'));

    // Count how many elements (aka statistics cards) are on the first line of global metrics
    const updateGlobalMetricsItemMargin = () => {
        let firstLineTop = -1;

        // Since I'm using the ref of a container
        // I'll access its only element
        // And then I'll access the children of the list
        for (let child of nodeList.children[0].children) {
            let childTop = child.getBoundingClientRect().top;
            if (firstLineTop < 0) {
                firstLineTop = childTop;
            }
            if (child.style.marginTop.toString().length === 0) {
                child.style.marginTop = '0px';
            }
            let childTopMargin = parseInt(child.style.marginTop);

            // some elements have 80.5 and some 80 but they're all on the same line
            // so I'll just assume that if the difference is less than 5px they're on the same line
            if (Math.abs(firstLineTop - childTop + childTopMargin) > 5) {
                child.style.marginTop = `${theme.spacing(1)}px`;
            } else {
                child.style.marginTop = '0px';
            }
        }
    };
    const [nodeList, setNodeList] = useState(null);

    const listRef = useCallback(node => {
        if (node !== null) {
            // node = ref.current
            setNodeList(node);
        }
    }, []);

    useEffect(() => {
        if (nodeList) {
            updateGlobalMetricsItemMargin();
        }
        window.addEventListener(
            'resize',
            () => nodeList && updateGlobalMetricsItemMargin(nodeList)
        );
        return () => {
            window.removeEventListener(
                'resize',
                () => nodeList && updateGlobalMetricsItemMargin(nodeList)
            );
        };
        // eslint-disable-next-line
    }, [nodeList]);

    return (
        <div className={styles.globalMetricsContainer}>
            {isLoading && <CircularProgress />}
            {!isLoading && globalMetricsData && (
                <Collapse
                    className={styles.globalMetrics}
                    collapsedHeight={globalMetricsHeight}
                    in={showGlobalMetrics}
                    classes={{
                        wrapperInner: styles.globalMetricsWrapperInner,
                    }}
                >
                    <div className={styles.globalMetricsSentimentIcon}>
                        <Bull
                            height={`${globalMetricsHeight}px`}
                            fill={theme.palette.icon.bullish}
                        />
                        {/* <Bear fill={theme.palette.icon.bearish} /> */}
                    </div>
                    <div ref={listRef}>
                        <Grid container className={styles.globalMetricsList}>
                            {/* news sentiment percentage + news sentiment */}
                            <GlobalMetricsItem
                                title="News"
                                color={theme.palette.icon.bullish}
                                ref={globalMetricsItemRef}
                            >
                                91% Bullish
                            </GlobalMetricsItem>

                            {/* fear and green index */}
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
                                aria-owns={
                                    anchorEl ? 'mouse-over-popover' : undefined
                                }
                                aria-describedby={
                                    anchorEl ? 'simple-popover' : undefined
                                }
                                // aria-haspopup="true"
                                onClick={
                                    anchorEl
                                        ? handlePopoverClose
                                        : handlePopoverOpen
                                }
                            >
                                <div className={styles.fearAndGreedIndexData}>
                                    {
                                        fearAndGreedIndexData[0]
                                            .value_classification
                                    }
                                    <KeyboardArrowRight
                                        className={styles.fearAndGreedIndexIcon}
                                    />
                                </div>
                            </GlobalMetricsItem>

                            {/* fear and greed index popover */}
                            <div ref={popoverRef}>
                                <Popover
                                    id={anchorEl ? 'simple-popover' : undefined}
                                    anchor={anchorEl}
                                    onClose={handlePopoverClose}
                                    className={styles.popover}
                                    disableEnforceFocus={true}
                                >
                                    {fearAndGreedIndexData.map(data => (
                                        <div
                                            className={
                                                styles.fearAndGreedHistoricalItem
                                            }
                                            key={data.timestamp}
                                        >
                                            <Typography
                                                className={`${styles.globalMetricsText}`}
                                                display="inline"
                                                variant="body2"
                                            >
                                                {new Date(
                                                    parseInt(data.timestamp) *
                                                        1000
                                                ).toLocaleString('default', {
                                                    month: 'long',
                                                })}{' '}
                                                {new Date(
                                                    parseInt(data.timestamp) *
                                                        1000
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
                                                        ? theme.palette.icon
                                                              .bearish
                                                        : data.value_classification
                                                              .toString()
                                                              .toLowerCase()
                                                              .includes('greed')
                                                        ? theme.palette.icon
                                                              .bullish
                                                        : theme.palette.text
                                                              .accentLight,
                                                }}
                                            >
                                                {data.value_classification}
                                            </Typography>
                                        </div>
                                    ))}
                                </Popover>
                            </div>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem title="Dominance">
                                {'BTC ' +
                                    globalMetricsData.btcDominance.toFixed(1)}
                                % ETH{' '}
                                {globalMetricsData.ethDominance.toFixed(1)}%
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem title="Active Currencies">
                                {globalMetricsData.activeCurrencies}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem title="Active Markets">
                                {globalMetricsData.activeMarkets}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            {/* add , every 3 digits from the end => nice looking number */}
                            <GlobalMetricsItem title="24h Volume">
                                $
                                {globalMetricsData.values.USD.totalVolume24h
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem title="Market Cap">
                                $
                                {globalMetricsData.values.USD.totalMarketCap
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </GlobalMetricsItem>
                        </Grid>
                    </div>

                    {!isResolutionLG && (
                        <div className={styles.button}>
                            <Button
                                onClick={() =>
                                    setShowGlobalMetrics(!showGlobalMetrics)
                                }
                                disableMargins
                            >
                                <ExpandMore />
                            </Button>
                        </div>
                    )}
                </Collapse>
            )}
        </div>
    );
};

export default GlobalMetrics;
