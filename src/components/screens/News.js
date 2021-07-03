import { makeStyles } from '@material-ui/core';
import CardList from '../card/CardList';
import GlobalMetrics from '../globalMetrics/GlobalMetrics';

const useStyles = makeStyles(theme => ({
    newsContainer: {
        width: '100%',
        // background: 'red',
    },
    newsItem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
}));

const News = () => {
    const styles = useStyles();

    return (
        <div className={styles.newsContainer}>
            {/* {isLoading && <CircularProgress />}
            {!isLoading && (
                
            )} */}
            <div className={styles.newsItem}>
                <GlobalMetrics />
            </div>
            <div className={styles.newsItem}>
                <CardList />
            </div>
        </div>
    );
};

export default News;
