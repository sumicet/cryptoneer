import { InputBase, makeStyles, Paper, useTheme } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    searchBar: {
        display: 'flex',
        flexDirection: 'row',
        background: theme.palette.divider,
        // background: 'transparent',
        // border: `0.5px solid ${theme.palette.text.secondary}`,
        '&:hover': {
            animation: `$colorTransition 250ms ${theme.transitions.easing.easeIn} forwards`,
        },
        marginLeft: 'auto',
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    },
    '@keyframes colorTransition': {
        '0%': {
            background: theme.palette.background.light,
        },
        '100%': {
            background: theme.palette.button.hover,
        },
    },
    searchBarIcon: {
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchBarInput: {
        paddingLeft: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
    },
}));

const SearchBar = () => {
    const theme = useTheme();
    const searchBarIconStyle = {
        width: `${theme.spacing.icon}`,
        height: `${theme.spacing.icon}`,
    };

    const styles = useStyles();
    return (
        <Paper elevation={0} className={styles.searchBar}>
            <div className={styles.searchBarIcon}>
                <Search style={searchBarIconStyle} />
            </div>
            <InputBase
                placeholder="Search…"
                inputProps={{
                    class: 'MuiTypography-root MuiTypography-body2',
                    'aria-label': 'search',
                    style: {
                        backgroundColor: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: theme.palette.text.primary,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        flex: '1',
                        fontSize: theme.typography.body2.fontSize,
                    },
                }}
                className={styles.searchBarInput}
            />
        </Paper>
    );
};

export default SearchBar;