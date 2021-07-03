import {
    makeStyles,
    Typography,
    ListItem,
    Link,
    Divider,
} from '@material-ui/core';
import { Launch } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    globalMetricsItem: {
        padding: 0,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flex: 0,
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        // fontSize: `${theme.typography.body2.fontSize * 0.9}px`,
    },
    globalMetricsTextData: {
        color: theme.palette.text.accentLight,
        // fontSize: `${theme.typography.body2.fontSize * 0.9}px`,
    },
    launchIcon: {
        width: theme.typography.body2.fontSize,
        height: theme.typography.body2.fontSize,
        color: theme.palette.text.primary,
        marginLeft: theme.spacing(0.5),
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: `${theme.palette.text.primary} !important`,
    },
}));

const GlobalMetricsItem = ({ color, children, redirectURL, title }) => {
    const styles = useStyles();

    const handleRedirect = url => {
        window.open(url, '_blank');
    };

    return (
        <ListItem disableGutters className={styles.globalMetricsItem}>
            <Typography
                display="inline"
                className={`${styles.globalMetricsText} ${styles.globalMetricsTextData}`}
                style={color && { color: color }}
                variant="body2"
            >
                {children}
            </Typography>
            <Link
                className={styles.link}
                onClick={() => handleRedirect(redirectURL)}
            >
                <Typography
                    display="inline"
                    className={styles.globalMetricsText}
                    variant="body2"
                >
                    {title}
                </Typography>
                {redirectURL && <Launch className={styles.launchIcon} />}
            </Link>
        </ListItem>
    );
};

export default GlobalMetricsItem;
