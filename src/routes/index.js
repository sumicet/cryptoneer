import { Container, makeStyles } from '@material-ui/core';
import Nav from '../components/nav/header/Nav';
import { Route, Switch } from 'react-router-dom';
import Article from '../pages/news/Article';
import News from '../pages/news/News';
import { useActions } from '../hooks/useActions';
import { useFetch } from '../hooks/useFetch';
import Footer from '../components/nav/Footer';
import GlobalMetricsPage from '../pages/GlobalMetricsPage';

const useStyles = makeStyles(theme => ({
    bodyWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        background: 'linear-gradient(#212078, #1a144e 400px)',
        paddingBottom: theme.spacing(8),
    },
    body: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: `1400px`,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },
    },
    pageWrapper: {
        width: '100%',
    },
}));

const Routes = () => {
    const styles = useStyles();

    // ******************* FETCH DATA ******************

    const {
        fetchNews,
        // fetchAllCoins,
        fetchGlobalMetrics,
        fetchFearAndGreedIndex,
    } = useActions();

    useFetch(fetchNews);
    // useFetch(fetchAllCoins);
    useFetch(fetchGlobalMetrics);
    useFetch(fetchFearAndGreedIndex);

    return (
        <>
            <Nav />
            <div className={styles.bodyWrapper}>
                <Container className={styles.body}>
                    <div className={styles.pageWrapper}>
                        <Switch>
                            <Route path="/" exact>
                                <News />
                            </Route>
                            <Route path="/home">
                                <News />
                            </Route>
                            <Route path="/news" exact>
                                <News />
                            </Route>
                            <Route path="/news/:id" exact>
                                <Article />
                            </Route>
                            <Route path="/global-metrics" exact>
                                <GlobalMetricsPage />
                            </Route>
                        </Switch>
                    </div>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default Routes;
