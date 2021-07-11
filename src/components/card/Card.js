import { ListItem, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import layout from '../../constants/layout';
import { Whatshot, TrendingUp, TrendingDown, Launch } from '@material-ui/icons';
import CryptocurrencyButtonList from '../buttons/CryptocurrencyButtonList';
import Button from '../buttons/Button';
import Text from '../text/Text';
import TimeDiff from '../../library/timeDiff';

/**
 * Card
 * @param news
 * @param allCoins
 */

// TODO make sure you fetch all coins at the beginning and use redux to get them

const Card = ({ news, allCoins }) => {
    const { title, url, categories, published_on } = news;

    const theme = useTheme();

    // we need the same height for both the date and title container
    // the font size of the title is theme.typography.body2.fontSize
    // but that will output something like 1rem
    // so turn that into a number only string (keep . for floats)
    // line height is theme.typography.body2.lineHeight
    // multiply the string by line height and by 16 to get the title container height in px
    const fontSize = parseFloat(
        theme.typography.body2.fontSize.match(/\d*\.\d*/g)
    );
    const lineHeight = parseFloat(theme.typography.body2.lineHeight);
    const fontUnit = theme.typography.body2.fontSize.match(/[A-Za-z]+/g)[0];
    const dateHeight =
        fontUnit === 'rem'
            ? `${parseInt(fontSize * lineHeight * 16)}px`
            : `${parseInt(fontSize * lineHeight)}px`;
    const useStyles = makeStyles(theme => ({
        cardContainer: {
            // marginBottom: layout.cardMarginBottom,
            padding: 0,
        },

        card: {
            '&:last-child': {
                paddingBottom: 0,
            },
            flex: 1,
            // background: 'red',
            paddingBottom: 0,
            backgroundColor: 'transparent',
            '&:hover': {
                animation: `$colorTransition 250ms ease-in forwards`,
            },
        },
        '@keyframes colorTransition': {
            '0%': {
                background: 'transparent',
            },
            '100%': {
                background: theme.palette.background.cardHover,
            },
        },
        cardHeader: {
            marginBottom: theme.spacing(1),
        },
        cardTitle: {
            fontWeight: '500',
            color: theme.palette.text.primary,
        },
        cardDate: {
            marginRight: theme.spacing(1),
            // fontWeight: '300',
            // fontSize: `${fontSize * 0.9}${fontUnit}`,
            display: 'grid',
            placeItems: 'center',
            float: 'left',
            height: `${dateHeight}`,
            // color: theme.palette.text.secondary,
        },
        cardButtons: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
        cardButtonsAppreciation: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        cardButtonsCurrencyList: {
            display: 'flex',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
        },
    }));
    const styles = useStyles();

    const iconStyle = {
        width: `${theme.spacing.icon}`,
        height: `${theme.spacing.icon}`,
    };

    const handleRedirect = event => {
        event.preventDefault();
        window.open(url, '_blank');
    };
    const handleHotClick = event => {
        event.preventDefault();
    };
    const handleBullishClick = event => {
        event.preventDefault();
    };
    const handleBearishClick = event => {
        event.preventDefault();
    };

    const calculateDate = date => {
        const currentDate = new Date().getTime();

        return TimeDiff(news.published_on * 1000, currentDate);
    };

    return (
        <ListItem disableGutters divider className={styles.cardContainer}>
            <CardContent className={styles.card}>
                <Grid container>
                    <Grid
                        item
                        className={styles.cardHeader}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                    >
                        <Text size="small" className={styles.cardDate}>
                            {calculateDate(published_on)}
                        </Text>
                        <Text size="medium">{title}</Text>
                    </Grid>

                    <div className={styles.cardButtons}>
                        <div className={styles.cardButtonsAppreciation}>
                            <Button text="1.2k" onClick={handleHotClick}>
                                <Whatshot
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.hot,
                                    }}
                                />
                            </Button>
                            <Button text="3.5k" onClick={handleBullishClick}>
                                <TrendingUp
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.bullish,
                                    }}
                                />
                            </Button>
                            <Button text="23" onClick={handleBearishClick}>
                                <TrendingDown
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.bearish,
                                    }}
                                />
                            </Button>
                        </div>

                        <div className={styles.cardButtonsCurrencyList}>
                            <CryptocurrencyButtonList
                                categories={categories}
                                title={title}
                                allCoins={allCoins}
                            >
                                <Button onClick={handleRedirect}>
                                    <Launch style={iconStyle} />
                                </Button>
                            </CryptocurrencyButtonList>
                        </div>
                    </div>
                </Grid>
            </CardContent>
        </ListItem>
    );
};

export default Card;
