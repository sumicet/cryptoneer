import { InputBase, Paper, useTheme } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { useStyles } from './styles';

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
