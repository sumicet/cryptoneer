import { makeStyles, Typography, Grid, Link, Button } from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import React from 'react';

const useStyles = makeStyles(theme => ({
    globalMetricsItem: {
        padding: 0,
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    globalMetricsItemContent: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
    },
    globalMetricsItemButton: {
        borderRadius: theme.shape.borderRadius,
        // '& .MuiTouchRipple-root span': {
        //     color: `${theme.palette.text.accentLight} !important`,
        // },
        '&:hover': {
            color: `${theme.palette.text.accentLight} !!important`,
        },
    },
    globalMetricsItemButtonRoot: {
        lineHeight: 0,
        minWidth: 0,
        textTransform: 'none',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        verticalAlign: 'unset',

        '& .MuiButton-label': {
            display: 'flex',
            flexDirection: 'column',
            padding: theme.spacing(2),
        },
        '&:hover span > p': {
            color: `${theme.palette.text.accentPink} !important`,
        },
        '&:hover span > a > p': {
            color: `${theme.palette.text.accentLightPink} !important`,
        },
        '&:hover': {
            background: 'transparent',
        },
    },
    globalMetricsText: {
        color: theme.palette.text.primary,
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        fontWeight: 700,
        display: 'inline-block',
        whiteSpace: 'nowrap',
        cursor: 'default',
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
    globalMetricsItemWrapper: {},
    remoteSpaces: {
        padding: 0,
        margin: 0,
    },
}));

const GlobalMetricsItem = React.forwardRef((props, ref) => {
    const styles = useStyles();
    const { color, children, redirectURL, description, onItemClick } = props;

    const handleRedirect = url => {
        window.open(url, '_blank');
    };

    const Container = ({ children }) => (
        <Link
            onClick={() => handleRedirect(redirectURL)}
            className={styles.link}
        >
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
            {description}
        </Typography>
    );

    const Wrapper = () => {
        return (
            <>
                <Typography
                    display="inline"
                    className={`${styles.globalMetricsText} ${styles.globalMetricsTextData}`}
                    style={color && { color: color }}
                    variant="body2"
                >
                    {children}
                </Typography>
                {redirectURL ? (
                    <Container>
                        <Title />
                    </Container>
                ) : (
                    <div className={styles.link}>
                        <Title />
                    </div>
                )}
            </>
        );
    };

    return (
        <div ref={ref} {...props} className={styles.globalMetricsItemWrapper}>
            <Grid item className={styles.globalMetricsItem}>
                {onItemClick ? (
                    <Button
                        onClick={onItemClick}
                        disableElevation
                        disableRipple
                        disableFocusRipple
                        // variant="text"
                        // size="small"
                        className={styles.globalMetricsItemButton}
                        classes={{
                            label: styles.globalMetricsItemContent, //ok
                            text: styles.remoteSpaces,
                            root: `${styles.remoteSpaces} ${styles.globalMetricsItemButtonRoot}`,
                            paper: styles.remoteSpaces,
                        }}
                    >
                        <Wrapper />
                    </Button>
                ) : (
                    <div className={styles.globalMetricsItemContent}>
                        <Wrapper />
                    </div>
                )}
            </Grid>
        </div>
    );
});

export default GlobalMetricsItem;
