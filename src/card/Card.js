import {
    ListItem,
    CardContent,
    Typography,
    Grid,
    Paper,
    ButtonGroup,
    Button,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import layout from '../constants/layout';
import { Whatshot, TrendingUp, TrendingDown, Launch } from '@material-ui/icons';
import CryptoButtonList from './CryptoButtonList';
import { useEffect } from 'react';
import TimeDiff from '../library/timeDiff';
import { useState } from 'react';

// TODO make sure you fetch all coins at the beginning and use redux to get them

const Card = ({ news, allCoins }) => {
    const { title, url, published_on, categories, body, date } = news;
    // const [date, setDate] = useState(undefined);

    // useEffect(() => {
    //     setDate(TimeDiff(published_on * 1000, new Date().getTime()));
    // }, [published_on]);

    const theme = useTheme();

    const useStyles = makeStyles({
        card: {
            // background: `linear-gradient(45deg, ${color.mediumGradient1}, ${color.mediumGradient2})`,
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
        actions: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: layout.cardPadding / 2,
            paddingBottom: layout.cardPadding,
        },
        title: {
            fontWeight: '500',
        },
        date: {
            marginRight: layout.cardPadding / 2,
            fontWeight: '300',
            fontSize: `${
                parseFloat(theme.typography.body2.fontSize.match(/\d*\.\d*/g)) *
                0.9
            }${theme.typography.body2.fontSize.match(/[A-Za-z]+/g)}`,
            display: 'grid',
            placeItems: 'center',
            // we need the same height for both the date and title container
            // the font size of the title is theme.typography.body2.fontSize
            // but that will output something like 1rem
            // so turn that into a number only string (keep . for floats)
            // line height is theme.typography.body2.lineHeight
            // multiply the string by line height and by 16 to get the title container height in px
            float: 'left',
            height: `${parseInt(
                parseFloat(theme.typography.body2.fontSize.match(/\d*\.\d*/g)) *
                    parseFloat(theme.typography.body2.lineHeight) *
                    16
            )}px`,
        },
        logos: {
            display: 'flex',
            paddingTop: layout.cardPadding / 2,
            paddingBottom: layout.cardPadding,
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
        header: {
            marginBottom: layout.cardPadding / 2,
        },
    });

    const styles = useStyles();

    const iconSize = theme.typography.fontSize * 1.5;
    const iconStyle = {
        width: `${iconSize}`,
        height: `${iconSize}`,
    };

    const handleRedirect = () => {
        window.open(url, '_blank');
    };

    return (
        <ListItem className={styles.listItem}>
            <Paper className={styles.card}>
                <CardContent className={styles.cardContent}>
                    <Grid className="grid" container>
                        <Grid
                            item
                            className={styles.header}
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                        >
                            <Typography className={styles.date} variant="body2">
                                {date}
                            </Typography>
                            <Typography
                                className={styles.title}
                                variant="body2"
                            >
                                {title}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            className={styles.actions}
                            s={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <ButtonGroup
                                variant="contained"
                                color="primary"
                                aria-label="outlined primary button group"
                                disableElevation
                            >
                                <Button>
                                    <Whatshot style={iconStyle} />
                                </Button>
                                <Button>
                                    <TrendingUp style={iconStyle} />
                                </Button>
                                <Button>
                                    <TrendingDown style={iconStyle} />
                                </Button>
                            </ButtonGroup>
                        </Grid>

                        <Grid
                            item
                            className={styles.logos}
                            xs={6}
                            sm={6}
                            md={6}
                            lg={6}
                            xl={6}
                        >
                            <CryptoButtonList
                                categories={categories}
                                iconSize={iconSize}
                                title={title}
                                allCoins={allCoins}
                            >
                                <Button onClick={handleRedirect}>
                                    <Launch style={iconStyle} />
                                </Button>
                            </CryptoButtonList>
                        </Grid>
                    </Grid>
                </CardContent>
            </Paper>
        </ListItem>
    );
};

export default Card;
