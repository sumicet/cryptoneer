import { makeStyles, Popover as MuiPopover, useTheme } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none',
    },
    popoverPaper: {
        background: 'transparent',
        paddingTop: theme.spacing(1),
        display: 'flex',
        flex: 1,
        pointerEvents: 'auto',
    },
    card: {
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        background: `linear-gradient(45deg, ${theme.palette.background.sectionLight}, ${theme.palette.background.sectionDark})`,
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
    },
}));

const Popover = ({ children, anchor, onClose }) => {
    const styles = useStyles();
    const theme = useTheme();
    return (
        <MuiPopover
            id="mouse-over-popover"
            className={styles.popover}
            classes={{
                paper: styles.popoverPaper,
            }}
            open={anchor ? true : false}
            anchorEl={anchor}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: theme.spacing(3),
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={onClose}
            disableRestoreFocus
            elevation={0}
            disableEnforceFocus={true}
            transitionDuration={100}
        >
            <div className={styles.card}>{children}</div>
        </MuiPopover>
    );
};

export default Popover;
