import { List as MuiList, CircularProgress } from '@material-ui/core';
import Card from '../Card';
import { Link } from 'react-router-dom';
import { useData } from '../../../hooks/useData';
import Error from '../../Error';
import { useStyles } from './styles';
import CurrenciesFilter from '../CurrenciesFilter';
import { useActions } from '../../../hooks/useActions';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const CardList = () => {
    const styles = useStyles();

    const news = useData(state => state.news);
    const coins = useData(state => state.coins);

    const { filterNews } = useActions();

    const filtered = useSelector(state => state.news.filtered);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        setFilteredData(filtered);
    }, [filtered]);

    const handleSelectedCurrencies = selected => {
        filterNews(selected);
    };

    return (
        <>
            {(news.loading || coins.loading) && <CircularProgress />}
            {news.error && <Error>{news.error}</Error>}
            {!news.error && !news.loading && !coins.loading && (
                <div>
                    <div className={styles.cardListFilter}>
                        <CurrenciesFilter
                            onSelectedCurrencies={handleSelectedCurrencies}
                        />
                    </div>
                    <MuiList className={styles.list}>
                        {filteredData.map(article => (
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
