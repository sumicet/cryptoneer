import { List as MuiList, CircularProgress } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useActions } from '../hooks/useActions';
import Card from './Card';

const List = () => {
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

    // ******************* HANDLE ERRORS******************

    useEffect(() => {
        if (news.data && news.error === null) {
            setNewsData(news.data);
        } else {
            if (news.error) {
                console.error(news.error, '// List.js');
            }
        }
    }, [news]);

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
                <MuiList>
                    {newsData !== undefined &&
                        coinsData !== undefined &&
                        newsData.map(article => (
                            <Card
                                news={article}
                                allCoins={coinsData}
                                key={article.id}
                            />
                        ))}
                </MuiList>
            )}
        </>
    );
};

export default List;
