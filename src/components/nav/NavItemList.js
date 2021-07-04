import { Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '../buttons/Button';
import SearchBar from './SearchBar';
import ProjectLogo from './ProjectLogo';

const useStyles = makeStyles(theme => ({
    navItemContainer: {
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        [theme.breakpoints.only('xs')]: {
            flexDirection: 'column',
        },
    },
    navDrawerHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: theme.spacing(2),
    },
    logo: {
        flex: 1,
    },
    navSearchBar: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            flex: 1,
        },

        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
            width: '100%',
        },
    },
    navLinkWrapper: {
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
    navLink: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
        '&:hover': {
            animation: `$colorTransition 250ms ${theme.transitions.easing.easeIn} forwards`,
        },
    },
    '@keyframes colorTransition': {
        '0%': {
            color: theme.palette.text.primary,
        },
        '100%': {
            color: theme.palette.text.accentPink,
        },
    },
    navLinkTitle: {
        fontWeight: '700',
    },
    navItemList: {
        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
        },
    },
}));

const NavItemList = ({ toggleDrawer }) => {
    const styles = useStyles();
    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    return (
        <div className={styles.navItemContainer}>
            {resolutionIsXS && (
                <>
                    <div className={styles.navDrawerHeader}>
                        <ProjectLogo style={styles.logo} />
                        <Button onClick={toggleDrawer()}>
                            <Clear />
                        </Button>
                    </div>
                    <div className={styles.navSearchBar}>
                        <SearchBar />
                    </div>
                </>
            )}
            <div className={styles.navItemList + ' ' + styles.navLinkWrapper}>
                <Link to="/home" className={styles.navLink}>
                    <Typography variant="body1" className={styles.navLinkTitle}>
                        Home
                    </Typography>
                </Link>
            </div>
            <div className={styles.navItemList + ' ' + styles.navLinkWrapper}>
                <Link to="/news" className={styles.navLink}>
                    <Typography variant="body1" className={styles.navLinkTitle}>
                        News
                    </Typography>
                </Link>
            </div>
            {!resolutionIsXS && (
                <div className={styles.navSearchBar}>
                    <SearchBar />
                </div>
            )}
        </div>
    );
};

export default NavItemList;
