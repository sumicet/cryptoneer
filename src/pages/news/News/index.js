import { makeStyles } from '@material-ui/core';
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
            <div className={`${styles.pageItem} ${styles.pageBody}`}>
                <CardList />
            </div>
        </>
    );
};

export default News;
