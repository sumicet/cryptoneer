import {
    List as MuiList,
    CircularProgress,
    makeStyles,
} from '@material-ui/core';
import Card from './Card';
import { Link } from 'react-router-dom';
import { useData } from '../../hooks/useData';
import Error from '../error/Error';
import { useEffect } from 'react';

const useStyles = makeStyles(theme => ({
    list: {
        width: '100%',
        padding: 0,
        background: '#1a144e',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
        '& a:last-of-type': {
            '& li': {
                borderBottom: 'none',
            },
        },
    },
}));

const CardList = () => {
    const styles = useStyles();

    const news = useData(state => state.news);
    const coins = useData(state => state.coins);

    useEffect(() => {
        console.log('news render');
    }, [news]);
    useEffect(() => {
        console.log('coins render');
    }, [coins]);

    return (
        <>
            {(news.loading || coins.loading) && <CircularProgress />}
            {news.error && <Error />}
            {!news.error && !news.loading && !coins.loading && (
                <MuiList className={styles.list}>
                    {news.data.map(article => (
                        <Link
                            key={article.id}
                            to={`/news/${article.id}`}
                            style={{ textDecoration: 'none' }}
                            disableGutters
                        >
                            <Card
                                news={article}
                                allCoins={coins.data}
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
