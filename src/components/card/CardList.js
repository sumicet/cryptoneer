import {
    List as MuiList,
    CircularProgress,
    makeStyles,
} from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../../hooks/useActions';
import Card from './Card';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        padding: 0,
        background: '#1a144e',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        [theme.breakpoints.only('xs')]: {
            // borderRadius: 0,
            // background: 'transparent',
        },
    },
}));

const CardList = () => {
    const styles = useStyles();
    const news = useSelector(state => state.news);
    const coins = useSelector(state => state.coins);

    // ******************* LOADING ******************
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (news.loading === true || coins.loading === true) {
            setIsLoading(true);
        } else {
            if (news.loading === false && coins.loading === false) {
                setIsLoading(false);
            }
        }
    }, [news, coins]);

    // ******************* FETCH DATA ******************

    const [newsData, setNewsData] = useState(undefined);
    const [coinsData, setCoinsData] = useState(undefined);
    const { fetchNews, fetchAllCoins } = useActions();
    useEffect(() => {
        fetchNews();
        fetchAllCoins();
    }, [fetchNews, fetchAllCoins]);

    useEffect(() => {
        if (news.data && news.error === null) {
            setNewsData(news.data);
        } else {
            if (news.error) {
                console.error(news.error, '// List.js');
            }
        }
    }, [news]);

    // ******************* HANDLE ERRORS******************

    useEffect(() => {
        if (coins.data && coins.error === null) {
            setCoinsData(coins.data);
        } else {
            if (coins.error) {
                console.error(coins.error, '// List.js');
            }
        }
    }, [coins]);

    return (
        <>
            {isLoading && <CircularProgress />}
            {!isLoading && (
                <MuiList className={styles.list}>
                    {newsData !== undefined &&
                        coinsData !== undefined &&
                        newsData.map(article => (
                            <Link
                                key={article.id}
                                to={`/news/${article.id}`}
                                style={{ textDecoration: 'none' }}
                                disableGutters
                            >
                                <Card
                                    news={article}
                                    allCoins={coinsData}
                                    key={article.id}
                                />
                            </Link>
                        ))}
                </MuiList>
            )}
        </>
    );
};

export default CardList;
