import { makeStyles, Typography, Grid, Link } from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    globalMetricsItem: {
        padding: 0,
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
    },
    globalMetricsTextData: {
        color: theme.palette.text.accentLight,
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

const GlobalMetricsItem = React.forwardRef((props, ref) => {
    const styles = useStyles();
    const { color, children, redirectURL, title } = props;

    const handleRedirect = url => {
        window.open(url, '_blank');
    };

    const Container = ({ children, className }) => (
        <Link onClick={() => handleRedirect(redirectURL)} className={className}>
            {children}
            {redirectURL && <Launch className={styles.launchIcon} />}
        </Link>
    );

    const Title = () => (
        <Typography
            display="inline"
            className={styles.globalMetricsText}
            variant="body2"
        >
            {title}
        </Typography>
    );

    return (
        <Grid item lg md={2} sm={4} xs={6} className={styles.globalMetricsItem}>
            <div ref={ref} {...props}>
                <Typography
                    display="inline"
                    className={`${styles.globalMetricsText} ${styles.globalMetricsTextData}`}
                    style={color && { color: color }}
                    variant="body2"
                >
                    {children}
                </Typography>
                {redirectURL ? (
                    <Container className={styles.link}>
                        <Title />
                    </Container>
                ) : (
                    <div className={styles.link}>
                        <Title />
                    </div>
                )}
            </div>
        </Grid>
    );
});

export default GlobalMetricsItem;
