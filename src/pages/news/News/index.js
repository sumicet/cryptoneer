import CardList from '../../../components/card/CardList';
import GlobalMetrics from '../../../components/globalMetrics/GlobalMetrics';
import { useStyles } from './styles';

const News = () => {
    const styles = useStyles();

    return (
        <>
            <div className={styles.pageItem}>
                <GlobalMetrics />
            </div>
            <div className={`${styles.pageItem}`}>
                <CardList />
            </div>
        </>
    );
};

export default News;
