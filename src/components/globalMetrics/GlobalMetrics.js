import {
    CircularProgress,
    makeStyles,
    useTheme,
    Collapse,
    Grid,
} from '@material-ui/core';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
// eslint-disable-next-line
import { ReactComponent as Bear } from '../../svg/other/Bear.svg';
import { ReactComponent as Bull } from '../../svg/other/Bull.svg';
import GlobalMetricsItem from './GlobalMetricsItem';
import Button from '../buttons/Button';
import { ExpandMore } from '@material-ui/icons';
import { createRef } from 'react';
import { useHistory } from 'react-router-dom';

const GlobalMetrics = () => {
    const history = useHistory();
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
        globalMetricsCollapseButton: {
            alignSelf: 'flex-start',
            width: globalMetricsHeight,
            height: globalMetricsHeight,
        },
        flex: {
            display: 'flex',
            flex: 1,
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
    const styles = useStyles();
    const theme = useTheme();

    const iconStyle = {
        width: `${theme.sizing.icon}`,
        height: `${theme.sizing.icon}`,
    };

    const globalMetricsItemVerticalMargin = theme.spacing(1);

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

    // ******************* GLOBAL METRICS CARD HEIGHT ******************

    // this is the height of the: icon (bull/bear), global metrics cards, and the collapsed component

    const globalMetricsItemRef = createRef();

    useEffect(() => {
        if (globalMetricsItemRef.current) {
            console.log(
                globalMetricsItemRef.current.getBoundingClientRect().height
            );
            setGlobalMetricsHeight(
                globalMetricsItemRef.current.getBoundingClientRect().height
            );
        }
    }, [globalMetricsItemRef]);

    // ******************* RESPONSIVENESS ******************

    // GTK Material UI doesn't forward refs so use the ref on containers.

    //TODO refresh full screen, dropdown button appears

    const [collapseGlobalMetrics, setCollapseGlobalMetrics] = useState(false);
    const [showDropdownButton, setShowDropdownButton] = useState(false);

    // Count how many elements (aka statistics cards) are on the first line of global metrics
    const updateGlobalMetricsItemMargin = () => {
        let firstLineTop = -1;
        let maxWidth = 0;
        // Since I'm using the ref of a container, I'll access its only element
        // Then I'll access the children of the list

        // all of them should have the same width so they're aligned vertically on smaller resolutions

        // find max width and count elems
        let count = 0;
        for (let child of nodeList.children[0].children) {
            if (
                child.className &&
                child.className
                    .toLowerCase()
                    .includes('globalMetricsItemWrapper'.toLowerCase())
            ) {
                count++;
                if (child.getBoundingClientRect().width > maxWidth) {
                    maxWidth = child.getBoundingClientRect().width;
                }
            }
        }

        // show drop down button if the combined width of the elements is bigger than the container's width
        if (
            maxWidth * count >
            nodeList.children[0].getBoundingClientRect().width
        ) {
            setShowDropdownButton(true);
        } else {
            setShowDropdownButton(false);
        }

        for (let child of nodeList.children[0].children) {
            let childTop = child.getBoundingClientRect().top;

            // asign max width to each element
            if (
                child.className &&
                child.className
                    .toLowerCase()
                    .includes('globalMetricsItemWrapper'.toLowerCase())
            ) {
                child.style.width = `${maxWidth}px`;
            }

            // if the element is on the first line
            if (firstLineTop < 0) {
                firstLineTop = childTop;
            }

            // assign marginTop 0 to make sure we don't get errors below when using the marginTop value
            if (child.style.marginTop.toString().length === 0) {
                child.style.marginTop = '0px';
            }

            let childTopMargin = parseInt(child.style.marginTop);

            // assign marginTop 0 to elems that fit on the first line and marginTop [number] to elems on the 2nd line
            // some elems have 80.5 and some 80 but they're all on the same line
            // so I'll just assume that if the difference is less than 5px they're on the same line
            if (Math.abs(firstLineTop - childTop + childTopMargin) > 6) {
                console.log(
                    child.getBoundingClientRect(),
                    firstLineTop,
                    childTop,
                    childTopMargin
                );
                child.style.marginTop = `${globalMetricsItemVerticalMargin}px`;
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
                    in={collapseGlobalMetrics}
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
                                description="News (last 24h)"
                                color={theme.palette.icon.bullish}
                                ref={globalMetricsItemRef}
                            >
                                91% Bullish
                            </GlobalMetricsItem>

                            {/* fear and green index */}
                            <GlobalMetricsItem
                                description="Fear & Greed Index"
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
                                onItemClick={() => {
                                    history.push(
                                        '/global-metrics/fear-and-greed-index'
                                    );
                                }}
                            >
                                {fearAndGreedIndexData[0].value_classification}
                            </GlobalMetricsItem>

                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem description="Dominance">
                                {'BTC ' +
                                    globalMetricsData.btcDominance.toFixed(1)}
                                % ETH{' '}
                                {globalMetricsData.ethDominance.toFixed(1)}%
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem description="Active Currencies">
                                {globalMetricsData.activeCurrencies}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem description="Active Markets">
                                {globalMetricsData.activeMarkets}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            {/* add , every 3 digits from the end => nice looking number */}
                            <GlobalMetricsItem description="24h Volume">
                                $
                                {globalMetricsData.values.USD.totalVolume24h
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </GlobalMetricsItem>
                            {/* <Divider orientation="vertical" flexItem /> */}
                            <GlobalMetricsItem description="Market Cap">
                                $
                                {globalMetricsData.values.USD.totalMarketCap
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </GlobalMetricsItem>
                        </Grid>
                    </div>

                    {showDropdownButton && (
                        <div className={styles.globalMetricsCollapseButton}>
                            <Button
                                onClick={() =>
                                    setCollapseGlobalMetrics(
                                        !collapseGlobalMetrics
                                    )
                                }
                                disableMargins
                            >
                                <ExpandMore style={iconStyle} />
                            </Button>
                        </div>
                    )}
                </Collapse>
            )}
        </div>
    );
};

export default GlobalMetrics;
