import {
    AppBar,
    Toolbar,
    Typography,
    makeStyles,
    useMediaQuery,
    SwipeableDrawer,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import { Menu, Clear } from '@material-ui/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import SearchBar from './SearchBar';

const useStyles = makeStyles(theme => ({
    nav: {
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.dark,
    },
    bar: {
        display: 'flex',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    title: {
        fontWeight: '700',
    },
    linkContainer: {
        // padding: theme.spacing(1),
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
    menuActions: {
        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
        },
    },
    search: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            flex: 1,
        },

        [theme.breakpoints.only('xs')]: {
            paddingRight: 0,
            paddingBottom: theme.spacing(2),
        },
    },
    link: {
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
    drawerButton: {
        display: 'flex',
        flex: 1,
        justifyContent: 'flex-end',
    },
    drawer: {
        flex: 1,
        background: 'transparent',
    },
    drawerPaper: {
        background: theme.palette.background.dark,
        padding: theme.spacing(4),
        display: 'flex',
        alignItems: 'center',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingBottom: theme.spacing(2),
    },
    logoStyle: {
        flex: 1,
    },
}));

const Nav = () => {
    const styles = useStyles();

    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = value => event => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setIsDrawerOpen(value);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    const MenuActions = () => (
        <>
            {resolutionIsXS && (
                <div className={styles.drawerHeader}>
                    <Logo logoStyle={styles.logoStyle} />
                    <Button onClick={handleCloseDrawer}>
                        <Clear />
                    </Button>
                </div>
            )}
            <div className={styles.menuActions + ' ' + styles.linkContainer}>
                <Link to="/home" className={styles.link}>
                    <Typography variant="body1" className={styles.title}>
                        Home
                    </Typography>
                </Link>
            </div>
            <div className={styles.menuActions + ' ' + styles.linkContainer}>
                <Link to="/news" className={styles.link}>
                    <Typography variant="body1" className={styles.title}>
                        News
                    </Typography>
                </Link>
            </div>
            <div className={styles.search}>
                <SearchBar />
            </div>
        </>
    );

    const Logo = ({ logoStyle }) => (
        <div className={logoStyle ? logoStyle : styles.linkContainer}>
            <Typography variant="h6" className={styles.title}>
                Cryptoneer
            </Typography>
        </div>
    );

    return (
        <AppBar position="static" className={styles.nav}>
            <Toolbar className={styles.bar}>
                <Logo />
                {resolutionIsXS ? (
                    <div className={styles.drawerButton}>
                        <Button onClick={toggleDrawer(true)}>
                            <Menu />
                        </Button>
                        <SwipeableDrawer
                            anchor="right"
                            open={isDrawerOpen}
                            onClose={toggleDrawer(false)}
                            onOpen={toggleDrawer(true)}
                            className={styles.drawer}
                            classes={{
                                paper: styles.drawerPaper,
                            }}
                        >
                            <MenuActions />
                        </SwipeableDrawer>
                    </div>
                ) : (
                    <MenuActions />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Nav;
