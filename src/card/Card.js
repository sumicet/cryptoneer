import {
    Card as MuiCard,
    ListItem,
    CardContent,
    Typography,
} from '@material-ui/core';
import color from '../constants/colors';
import LAYOUT from '../constants/layout';
import { makeStyles } from '@material-ui/core/styles';
import Element from './Element';
import layout from '../constants/layout';

const useStyles = makeStyles({
    card: {
        width: layout.cardWidth,
        boxShadow: `0px 0px ${layout.cardShadow} ${color.darkGradient2}`,
        borderRadius: layout.cardBorderRadius,
        // padding: 10,
        background: `transparent`,
    },
    listItem: {
        borderRadius: layout.cardBorderRadius,
        padding: 0,
        marginBottom: layout.cardMarginBottom,
        background: `linear-gradient(45deg, ${color.mediumGradient1}, ${color.mediumGradient2})`,
    },
    cardContent: {
        '&:last-child': {
            paddingBottom: layout.cardPadding,
        },
        padding: layout.cardPadding,
    },
});

const Card = () => {
    const styles = useStyles();
    const handleClick = () => {
        alert('click');
    };
    return (
        <ListItem button onClick={handleClick} className={styles.listItem}>
            <MuiCard className={styles.card}>
                <CardContent className={styles.cardContent}>
                    {/* <Typography color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography> */}
                    <Typography variant="body1">
                        Bitcoin Is ‘Cheap’ Relative to Its Trend, Says Pantera
                        CEO Dan Morehead
                    </Typography>
                    <Typography variant="body2">
                        well meaning and kindly.
                    </Typography>
                </CardContent>
            </MuiCard>
        </ListItem>
    );
};

export default Card;
