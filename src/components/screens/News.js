import { makeStyles } from '@material-ui/core';
import CardList from '../card/CardList';
import { Paper, CircularProgress } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useActions';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    container: {
        width: '100%',
        // background: 'red',
    },
});

const News = () => {
    const styles = useStyles();

    // const globalMetrics = useSelector(state => state.globalMetrics);

    // // ******************* LOADING ******************
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     if (globalMetrics.loading === true) {
    //         setIsLoading(true);
    //     } else {
    //         if (globalMetrics.loading === false) {
    //             setIsLoading(false);
    //         }
    //     }
    // }, [globalMetrics]);

    // // ******************* FETCH DATA ******************

    // const [globalMetricsData, setGlobalMetricsData] = useState(undefined);
    // const { fetchGlobalMetrics } = useActions();
    // useEffect(() => {
    //     fetchGlobalMetrics();
    //     console.log(globalMetrics);
    // }, [fetchGlobalMetrics]);

    // // ******************* HANDLE ERRORS******************

    // useEffect(() => {
    //     if (globalMetrics.data && globalMetrics.error === null) {
    //         setGlobalMetricsData(globalMetrics.data);
    //     } else {
    //         if (globalMetrics.status.error_message !== null) {
    //             console.error(globalMetrics.status.error_message, '// News.js');
    //         }
    //     }
    // }, [globalMetrics]);

    return (
        <div className={styles.container}>
            {/* {isLoading && <CircularProgress />}
            {!isLoading && (
                
            )} */}
            <Paper elevation={0}>
                <CardList />
            </Paper>
        </div>
    );
};

export default News;
