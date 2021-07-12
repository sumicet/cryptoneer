import { List as MuiList, CircularProgress } from '@material-ui/core';
import Card from '../Card';
import { Link } from 'react-router-dom';
import { useData } from '../../../hooks/useData';
import Error from '../../Error';
import { useStyles } from './styles';
import CardCurrenciesFilterButton from '../CardCurrenciesFilterButton';

const CardList = () => {
    const styles = useStyles();

    const news = useData(state => state.news);
    const coins = useData(state => state.coins);

    return (
        <>
            {(news.loading || coins.loading) && <CircularProgress />}
            {news.error && <Error />}
            {!news.error && !news.loading && !coins.loading && (
                <div>
                    <CardCurrenciesFilterButton />
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
                </div>
            )}
        </>
    );
};

export default CardList;
