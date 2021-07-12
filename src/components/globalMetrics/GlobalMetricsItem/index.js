import { makeStyles, Typography, Grid, Link, Button } from '@material-ui/core';
import { Launch } from '@material-ui/icons';
import React from 'react';
import { useStyles } from './styles';

const GlobalMetricsItem = React.forwardRef((props, ref) => {
    const styles = useStyles();
    const { color, children, redirectURL, description, onItemClick } = props;

    const handleRedirect = url => {
        window.open(url, '_blank');
    };

    const Container = ({ children }) => (
        <Link
            onClick={() => handleRedirect(redirectURL)}
            className={styles.globalMetricsLink}
        >
            {children}
            {redirectURL && (
                <Launch className={styles.globalMetricsLaunchIcon} />
            )}
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
            <div className={styles.globalMetricsItem}>
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
            </div>
        </div>
    );
});

export default GlobalMetricsItem;
