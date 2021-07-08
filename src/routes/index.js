import { Container, makeStyles } from '@material-ui/core';
import Nav from '../components/nav/Nav';
import { Route, Switch } from 'react-router-dom';
import Article from '../screens/news/Article';
import News from '../components/screens/News';
import FearAndGreedIndex from '../screens/globalMetrics/FearAndGreedIndex';
import { useEffect, useState } from 'react';
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux';
import { useFetch } from '../hooks/useFetch';

const useStyles = makeStyles(theme => ({
    bodyContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        background: 'linear-gradient(#212078, #1a144e 10%)',
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
}));

const Routes = () => {
    const styles = useStyles();

    // ******************* FETCH DATA ******************

    const { fetchNews, fetchAllCoins } = useActions();

    useFetch(fetchNews);
    useFetch(fetchAllCoins);

    return (
        <>
            <Nav />
            <div className={styles.bodyContainer}>
                <Container className={styles.body}>
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
                        <Route path="/global-metrics/fear-and-greed-index">
                            <FearAndGreedIndex />
                        </Route>
                    </Switch>
                </Container>
            </div>
        </>
    );
};

export default Routes;
