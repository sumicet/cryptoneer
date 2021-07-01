import {
    CircularProgress,
    makeStyles,
    Typography,
    Container,
    useTheme,
    List,
    ListItem,
    Divider,
    Button,
    Link,
} from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import { ReactComponent as Bear } from '../../svg/other/Bear.svg';
import { ReactComponent as Bull } from '../../svg/other/Bull.svg';

const useStyles = makeStyles(theme => ({
    globalMetricsContainer: {
        display: 'flex',
        flexDirection: 'row',
        maxWidth: '1400px',
        // padding: 0,
        // margin: 0,
    },
    globalMetricsItem: {
        padding: 0,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        // border: '1px solid white',
        display: 'grid',
        placeItems: 'center',
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        // fontSize: `${theme.typography.body2.fontSize * 0.9}px`,
    },
    globalMetricsList: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    globalMetricsTextData: {
        color: theme.palette.text.accentLight,
        fontWeight: 700,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        // fontSize: `${theme.typography.body2.fontSize * 0.9}px`,
    },
    globalMetricsSentimentIcon: {
        height: theme.typography.fontSize * 0.9 * 2 + theme.spacing(2) * 2,
        width: theme.typography.fontSize * 0.9 * 2 + theme.spacing(2) * 2,
        // marginRight: theme.spacing(),
    },
    globalMetrics: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    launchIcon: {
        width: `${theme.typography.fontSize}px`,
        height: `${theme.typography.fontSize}px`,
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(0.5),
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: `${theme.palette.text.primary} !important`,
    },
}));

const GlobalMetrics = () => {
    const globalMetrics = useSelector(state => state.globalMetrics);

    // ******************* LOADING ******************
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (globalMetrics.loading === true) {
            setIsLoading(true);
        } else {
            if (globalMetrics.loading === false) {
                setIsLoading(false);
            }
        }
    }, [globalMetrics]);

    // // ******************* FETCH DATA ******************

    const [globalMetricsData, setGlobalMetricsData] = useState(undefined);
    const { fetchGlobalMetrics } = useActions();
    useEffect(() => {
        fetchGlobalMetrics();
    }, [fetchGlobalMetrics]);

    // // ******************* HANDLE ERRORS******************

    useEffect(() => {
        if (globalMetrics.data && globalMetrics.error === null) {
            setGlobalMetricsData(globalMetrics.data);
        } else {
            if (globalMetrics.error) {
                console.error(globalMetrics.error, '// News.js');
            }
        }
    }, [globalMetrics]);
    const styles = useStyles();

    const handleRedirect = (event, url) => {
        event.preventDefault();
        window.open(url, '_blank');
    };

    const GlobalMetricsItem = ({ title, children, color, redirectURL }) => (
        <ListItem disableGutters className={styles.globalMetricsItem}>
            <Typography
                display="inline"
                className={styles.globalMetricsTextData}
                style={color && { color: color }}
                variant="body2"
            >
                {children}
            </Typography>
            <Link
                className={styles.link}
                onClick={() => handleRedirect(redirectURL)}
            >
                <Typography
                    display="inline"
                    className={styles.globalMetricsText}
                    variant="body2"
                >
                    {title}
                </Typography>
                {redirectURL && <Launch className={styles.launchIcon} />}
            </Link>
        </ListItem>
    );

    const theme = useTheme();

    return (
        <div className={styles.globalMetricsContainer}>
            {isLoading && <CircularProgress />}
            {!isLoading && globalMetricsData && (
                <div className={styles.globalMetrics}>
                    <div className={styles.globalMetricsSentimentIcon}>
                        <Bull fill={theme.palette.icon.bullish} />
                        {/* <Bear fill={theme.palette.icon.bearish} /> */}
                    </div>
                    <List
                        divider
                        disablePadding
                        className={styles.globalMetricsList}
                    >
                        <GlobalMetricsItem
                            title="News"
                            color={theme.palette.icon.bullish}
                        >
                            91% Bullish
                        </GlobalMetricsItem>
                        <Divider orientation="vertical" flexItem />
                        {/* https://api.alternative.me/fng/?limit=3 */}
                        <GlobalMetricsItem
                            title="Fear & Greed Index"
                            color={theme.palette.icon.bullish}
                            redirectURL="https://alternative.me/crypto/fear-and-greed-index/"
                        >
                            Greed
                        </GlobalMetricsItem>
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
                </div>
            )}
        </div>
    );
};

export default GlobalMetrics;
