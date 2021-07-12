import { ListItem, CardContent, Typography, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Whatshot, TrendingUp, TrendingDown, Launch } from '@material-ui/icons';
import CryptoButtonList from '../../buttons/CryptoButtonList';
import Button from '../../buttons/Button';
import Text from '../../text/Text';
import TimeDiff from '../../../library/timeDiff';
import { useStyles } from './styles';

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
                        <Text
                            size="small"
                            className={styles.cardDate}
                            style={{ height: `${dateHeight}` }}
                        >
                            {calculateDate(published_on)}
                        </Text>
                        <Text size="medium">{title}</Text>
                    </Grid>

                    <div className={styles.cardButtonsContainer}>
                        <div
                            className={`${styles.cardButtons} ${styles.cardAppreciationButtons}`}
                        >
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

                        <div
                            className={`${styles.cardButtons} ${styles.cardCryptoListButtons}`}
                        >
                            <CryptoButtonList
                                categories={categories}
                                title={title}
                                allCoins={allCoins}
                            >
                                <Button onClick={handleRedirect}>
                                    <Launch style={iconStyle} />
                                </Button>
                            </CryptoButtonList>
                        </div>
                    </div>
                </Grid>
            </CardContent>
        </ListItem>
    );
};

export default Card;
