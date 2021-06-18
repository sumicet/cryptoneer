import {
    Card as MuiCard,
    ListItem,
    CardContent,
    Typography,
    Grid,
    Paper,
} from '@material-ui/core';
import color from '../constants/colors';
import { makeStyles } from '@material-ui/core/styles';
import layout from '../constants/layout';
import { Whatshot, TrendingUp, TrendingDown } from '@material-ui/icons';
import { lazy, useEffect } from 'react';

const useStyles = makeStyles({
    card: {
        background: `linear-gradient(45deg, ${color.mediumGradient1}, ${color.mediumGradient2})`,
        flex: 1,
    },
    listItem: {
        marginBottom: layout.cardMarginBottom,
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: 0,
        },
        padding: layout.cardPadding,
        paddingBottom: 0,
    },
    button: {
        display: 'grid',
        placeItems: 'center',
        flex: 1,
        paddingTop: layout.cardPadding / 2,
        paddingBottom: layout.cardPadding / 2,
    },
    title: {
        marginBottom: layout.cardPadding / 2,
    },
});

const Card = ({ title, currencies }) => {
    const styles = useStyles();
    const handleClick = () => {
        alert('click');
    };

    useEffect(() => {
        console.log(currencies);
    }, []);

    const Icon = require('../../node_modules/cryptocurrency-icons/svg/color/btc.svg');

    return (
        <ListItem className={styles.listItem}>
            <Paper className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <img src={Icon} />
                    <Grid className="grid" container>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Typography
                                className={styles.title}
                                variant="body1"
                            >
                                {title}
                                {currencies && currencies[0].code}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            className={styles.button}
                            s={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                        >
                            <Whatshot />
                        </Grid>

                        <Grid
                            item
                            className={styles.button}
                            s={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                        >
                            <TrendingUp />
                        </Grid>
                        <Grid
                            item
                            className={styles.button}
                            s={4}
                            sm={4}
                            md={4}
                            lg={4}
                            xl={4}
                        >
                            <TrendingDown />
                        </Grid>
                    </Grid>
                </CardContent>
            </Paper>
        </ListItem>
    );
};

export default Card;
