import { ListItem, CardContent, Typography, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import layout from '../../constants/layout';
import { Whatshot, TrendingUp, TrendingDown, Launch } from '@material-ui/icons';
import CryptoButtonList from './CryptoButtonList';
import Button from '../button/Button';

/**
 * Card
 * @param news
 * @param allCoins
 */

// TODO make sure you fetch all coins at the beginning and use redux to get them

const Card = ({ news, allCoins }) => {
    const { title, url, categories, date } = news;

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
        listItem: {
            // marginBottom: layout.cardMarginBottom,
            padding: 0,
            '&:hover': {
                animation: `$colorTransition 250ms ${theme.transitions.easing.easeIn} forwards`,
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
        cardContent: {
            '&:last-child': {
                paddingBottom: 0,
            },
            flex: 1,
            // background: 'red',
            paddingBottom: 0,
        },
        actions: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        title: {
            fontWeight: '500',
            color: theme.palette.text.primary,
        },
        date: {
            marginRight: theme.spacing(1),
            fontWeight: '300',
            fontSize: `${fontSize * 0.9}${fontUnit}`,
            display: 'grid',
            placeItems: 'center',
            float: 'left',
            height: `${dateHeight}`,
            color: theme.palette.text.secondary,
        },
        logos: {
            display: 'flex',
            paddingTop: theme.spacing(1),
            paddingBottom: theme.spacing(2),
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
        },
        header: {
            marginBottom: theme.spacing(1),
        },
        button: {
            color: theme.palette.text.secondary,
            background: theme.palette.button.primary,
            marginRight: theme.spacing(1),
            padding: theme.spacing(1),
            minHeight: 0,
            // minWidth: 0,
            '& .MuiTouchRipple-root span': {
                backgroundColor: theme.palette.button.ripple,
            },
            '&:hover': {
                backgroundColor: theme.palette.button.hover,
            },
        },
        actionsContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
        },
    }));
    const styles = useStyles();

    const iconSize = theme.typography.fontSize * 1.3;
    const iconStyle = {
        width: `${iconSize}`,
        height: `${iconSize}`,
    };

    const handleRedirect = event => {
        event.preventDefault();
        window.open(url, '_blank');
    };
    const handleHotClick = event => {
        event.preventDefault();
    };
    const handleUpvoteClick = event => {
        event.preventDefault();
    };
    const handleDownvoteClick = event => {
        event.preventDefault();
    };

    return (
        <ListItem disableGutters divider className={styles.listItem}>
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
                        <Typography className={styles.title} variant="body2">
                            {title}
                        </Typography>
                    </Grid>

                    <div className={styles.actionsContainer}>
                        <div className={styles.actions}>
                            <Button text="1.2k" onClick={handleHotClick}>
                                <Whatshot
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.hot,
                                    }}
                                />
                            </Button>
                            <Button text="3.5k" onClick={handleUpvoteClick}>
                                <TrendingUp
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.bullish,
                                    }}
                                />
                            </Button>
                            <Button text="23" onClick={handleDownvoteClick}>
                                <TrendingDown
                                    style={{
                                        ...iconStyle,
                                        color: theme.palette.icon.bearish,
                                    }}
                                />
                            </Button>
                        </div>

                        <div className={styles.logos}>
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
                        </div>
                    </div>
                </Grid>
            </CardContent>
        </ListItem>
    );
};

export default Card;
