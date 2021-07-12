import {
    CircularProgress,
    makeStyles,
    useTheme,
    Collapse,
} from '@material-ui/core';
import { useCallback } from 'react';
import { useEffect, useState } from 'react';
// eslint-disable-next-line
import { ReactComponent as Bear } from '../../../svg/other/Bear.svg';
import { ReactComponent as Bull } from '../../../svg/other/Bull.svg';
import GlobalMetricsItem from '../GlobalMetricsItem';
import Button from '../../buttons/Button';
import { ExpandMoreRounded, ExpandLessRounded } from '@material-ui/icons';
import { createRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useData } from '../../../hooks/useData';
import Error from '../../Error';
import { getFearAndGreedIndexColor } from '../../../library/getFearAndGreedIndexColor';
import { formatBigNumbers } from '../../../library/formatBigNumbers';
import { useStyles } from './styles';

const GlobalMetrics = ({ collapse }) => {
    const history = useHistory();
    const [globalMetricsHeight, setGlobalMetricsHeight] = useState();

    const styles = useStyles();
    const theme = useTheme();

    const iconStyle = {
        width: `${theme.sizing.icon}`,
        height: `${theme.sizing.icon}`,
    };

    const globalMetricsItemVerticalMargin = theme.spacing(1);

    const globalMetrics = useData(state => state.globalMetrics);
    const fearAndGreedIndex = useData(state => state.fearAndGreedIndex);

    // ******************* GLOBAL METRICS CARD HEIGHT ******************

    // this is the height of the: icon (bull/bear), global metrics cards, and the collapsed component

    const globalMetricsItemRef = createRef();

    useEffect(() => {
        if (globalMetricsItemRef.current) {
            setGlobalMetricsHeight(
                globalMetricsItemRef.current.getBoundingClientRect().height
            );
        }
    }, [globalMetricsItemRef]);

    // ******************* RESPONSIVENESS ******************

    // GTK Material UI doesn't forward refs so use the ref on containers.

    //TODO refresh full screen, dropdown button appears

    const [collapseGlobalMetrics, setCollapseGlobalMetrics] = useState(
        collapse ? true : false
    );
    const [showDropdownButton, setShowDropdownButton] = useState(false);

    const [nodeList, setNodeList] = useState(null);

    // Count how many elements (aka statistics cards) are on the first line of global metrics
    const updateGlobalMetricsItemMargin = useCallback(() => {
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
            // if (Math.abs(firstLineTop - childTop + childTopMargin) > 6) {
            // child.style.marginTop = `${globalMetricsItemVerticalMargin}px`;
            // } else {
            //     child.style.marginTop = '0px';
            // }
        }

        if (
            maxWidth * count >
            nodeList.children[0].getBoundingClientRect().width
        ) {
            setShowDropdownButton(true);
        } else {
            setShowDropdownButton(false);
        }
    }, [globalMetricsItemVerticalMargin, nodeList]);

    const listRef = useCallback(node => {
        if (node !== null) {
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

    useEffect(() => {
        if (!globalMetrics.loading) {
            console.log(globalMetrics.data);
        }
    }, [globalMetrics]);

    return (
        <div className={styles.globalMetricsContainer}>
            {globalMetrics.loading && <CircularProgress />}
            {globalMetrics.error && <Error />}
            {!globalMetrics.error &&
                !globalMetrics.loading &&
                globalMetrics.data && (
                    <Collapse
                        className={styles.globalMetricsCollapse}
                        collapsedHeight={globalMetricsHeight}
                        in={collapseGlobalMetrics}
                        classes={{
                            wrapperInner:
                                styles.globalMetricsCollapseWrapperInner,
                        }}
                    >
                        {!collapse && (
                            <div
                                className={styles.globalMetricsSentimentIcon}
                                style={{ height: globalMetricsHeight }}
                            >
                                <Bull
                                    height={`${globalMetricsHeight}px`}
                                    fill={theme.palette.icon.bullish}
                                />
                                {/* <Bear fill={theme.palette.icon.bearish} /> */}
                            </div>
                        )}
                        <div ref={listRef}>
                            <div container className={styles.globalMetricsList}>
                                {/* news sentiment percentage + news sentiment */}
                                <GlobalMetricsItem
                                    description="News (last 24h)"
                                    color={theme.palette.icon.bullish}
                                    ref={globalMetricsItemRef}
                                >
                                    91% Bullish
                                </GlobalMetricsItem>

                                {/* fear and green index */}
                                {!fearAndGreedIndex.loading && (
                                    <GlobalMetricsItem
                                        description="Fear & Greed Index"
                                        color={getFearAndGreedIndexColor(
                                            fearAndGreedIndex.data[0].value
                                        )}
                                        redirectURL="https://alternative.me/crypto/fear-and-greed-index/"
                                        onItemClick={() => {
                                            history.push('/global-metrics');
                                        }}
                                    >
                                        {
                                            fearAndGreedIndex.data[0]
                                                .value_classification
                                        }
                                    </GlobalMetricsItem>
                                )}

                                {/* <Divider orientation="vertical" flexItem /> */}
                                <GlobalMetricsItem description="Dominance">
                                    {'BTC ' +
                                        globalMetrics.data.btc_dominance.toFixed(
                                            1
                                        )}
                                    % ETH{' '}
                                    {globalMetrics.data.eth_dominance.toFixed(
                                        1
                                    )}
                                    %
                                </GlobalMetricsItem>
                                {/* <Divider orientation="vertical" flexItem /> */}
                                {/* add , every 3 digits from the end => nice looking number */}
                                <GlobalMetricsItem description="24h Volume">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.quote.USD
                                            .total_volume_24h
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Total Market Cap">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.quote.USD
                                            .total_market_cap
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Altcoin Market Cap">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.quote.USD
                                            .altcoin_market_cap
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Altcoin Volume">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.quote.USD
                                            .altcoin_volume_24h
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Active Cryptos">
                                    {globalMetrics.data.active_cryptocurrencies}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Active Exchanges">
                                    {globalMetrics.data.active_exchanges}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Active Market Pairs">
                                    {globalMetrics.data.active_market_pairs}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Total Cryptos">
                                    {globalMetrics.data.total_cryptocurrencies}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Total Exchanges">
                                    {globalMetrics.data.total_exchanges}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Defi Volume">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.defi_volume_24h
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Defi Market Cap">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.defi_market_cap
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Defi Change">
                                    {parseInt(
                                        globalMetrics.data
                                            .defi_24h_percentage_change * 100
                                    ) / 100}
                                    %
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Stable Coin Volume">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.stablecoin_volume_24h
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="Stable Coin Market Cap">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data.stablecoin_market_cap
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Stable Coin Change">
                                    {parseInt(
                                        globalMetrics.data
                                            .stablecoin_24h_percentage_change *
                                            100
                                    ) / 100}
                                    %
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Derivatives Volume">
                                    $
                                    {formatBigNumbers(
                                        globalMetrics.data
                                            .derivatives_volume_24h
                                    )}
                                </GlobalMetricsItem>
                                <GlobalMetricsItem description="24h Derivatives Change">
                                    {parseInt(
                                        globalMetrics.data
                                            .derivatives_24h_percentage_change *
                                            100
                                    ) / 100}
                                    %
                                </GlobalMetricsItem>
                            </div>
                        </div>

                        {!collapse && showDropdownButton && (
                            <div
                                className={styles.globalMetricsCollapseButton}
                                style={{
                                    width: globalMetricsHeight,
                                    height: globalMetricsHeight,
                                }}
                            >
                                <Button
                                    onClick={() =>
                                        setCollapseGlobalMetrics(
                                            !collapseGlobalMetrics
                                        )
                                    }
                                    disableMargins
                                >
                                    {collapseGlobalMetrics ? (
                                        <ExpandLessRounded style={iconStyle} />
                                    ) : (
                                        <ExpandMoreRounded style={iconStyle} />
                                    )}
                                </Button>
                            </div>
                        )}
                    </Collapse>
                )}
        </div>
    );
};

export default GlobalMetrics;
