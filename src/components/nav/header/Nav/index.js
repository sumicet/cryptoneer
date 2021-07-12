import {
    AppBar,
    Toolbar,
    useMediaQuery,
    SwipeableDrawer,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { useState } from 'react';
import Button from '../../../buttons/Button';
import Logo from '../Logo';
import NavItem from '../NavItem';
import { useStyles } from './styles';

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
                className={styles.navDrawer}
                classes={{
                    paper: styles.navDrawerPaper,
                }}
            >
                <NavItem toggleDrawer={toggleDrawer} />
            </SwipeableDrawer>

            <AppBar position="static" className={styles.nav}>
                <Toolbar className={styles.navToolbar}>
                    <Logo />
                    {/* turn nav items into a mobile menu if the resolution is too small */}
                    {resolutionIsXS && (
                        <div className={styles.navDrawerToggleButton}>
                            <Button onClick={toggleDrawer()}>
                                <Menu />
                            </Button>
                        </div>
                    )}
                    {!resolutionIsXS && <NavItem toggleDrawer={toggleDrawer} />}
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Nav;
