import {
    AppBar,
    Toolbar,
    makeStyles,
    useMediaQuery,
    SwipeableDrawer,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';
import Button from '../buttons/Button';
import ProjectLogo from './ProjectLogo';
import NavItemList from './NavItemList';

const useStyles = makeStyles(theme => ({
    nav: {
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.dark,
    },
    navToolbar: {
        display: 'flex',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    navDrawerToggleButton: {
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
        padding: theme.spacing(2),
    },
}));

const Nav = () => {
    const styles = useStyles();

    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => event => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <>
            <SwipeableDrawer
                anchor="top"
                open={isDrawerOpen}
                onClose={toggleDrawer()}
                onOpen={toggleDrawer()}
                className={styles.drawer}
                classes={{
                    paper: styles.drawerPaper,
                }}
            >
                <NavItemList toggleDrawer={toggleDrawer} />
            </SwipeableDrawer>

            <AppBar position="static" className={styles.nav}>
                <Toolbar className={styles.navToolbar}>
                    <ProjectLogo />
                    {/* turn nav items into a mobile menu if the resolution is too small */}
                    {resolutionIsXS && (
                        <div className={styles.navDrawerToggleButton}>
                            <Button onClick={toggleDrawer()}>
                                <Menu />
                            </Button>
                        </div>
                    )}
                    {!resolutionIsXS && (
                        <NavItemList toggleDrawer={toggleDrawer} />
                    )}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Nav;
