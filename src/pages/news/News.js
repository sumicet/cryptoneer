import { makeStyles } from '@material-ui/core';
import CardList from '../../components/card/CardList';
import GlobalMetrics from '../../components/globalMetrics/GlobalMetrics';

const useStyles = makeStyles(theme => ({
    pageItem: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    pageBody: {
        width: '100%',
        background: theme.palette.background.dark,
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
}));

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
