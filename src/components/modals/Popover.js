import { makeStyles, Popover as MuiPopover } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    popover: {
        pointerEvents: 'none',
    },
    popoverPaper: {
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        background: `linear-gradient(45deg, ${theme.palette.background.sectionLight}, ${theme.palette.background.sectionDark})`,
        display: 'flex',
        flexDirection: 'column',
    },
}));

const Popover = ({ children, anchor, onClose }) => {
    const styles = useStyles();
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
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={onClose}
            disableRestoreFocus
            elevation={0}
        >
            {children}
        </MuiPopover>
    );
};

export default Popover;
