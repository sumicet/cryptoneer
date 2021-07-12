import { useMediaQuery, useTheme } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../../buttons/Button';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import Text from '../../../text/Text';
import { useStyles } from './styles';
import { useEffect } from 'react';

const NavList = ({ toggleDrawer }) => {
    const styles = useStyles();
    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    const location = useLocation();
    const theme = useTheme();
    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    const NavItem = ({ text, path }) => {
        return (
            <li className={styles.navItem + ' ' + styles.navLinkWrapper}>
                <Link to={path} className={styles.navLink}>
                    <Text
                        size="large"
                        style={{
                            color:
                                path === location.pathname
                                    ? theme.palette.text.accentPink
                                    : theme.palette.text.primary,
                        }}
                    >
                        {text}
                    </Text>
                </Link>
            </li>
        );
    };

    return (
        <ul className={styles.navList}>
            {resolutionIsXS && (
                <>
                    <div className={styles.navDrawerHeader}>
                        <Logo style={styles.navLogo} />
                        <Button onClick={toggleDrawer()}>
                            <Clear />
                        </Button>
                    </div>
                    <div className={styles.navSearchBar}>
                        <SearchBar />
                    </div>
                </>
            )}
            <NavItem text="Home" path="/home" />
            <NavItem text="News" path="/news" />
            <NavItem text="Global Metrics" path="/global-metrics" />
            {!resolutionIsXS && (
                <div className={styles.navSearchBar}>
                    <SearchBar />
                </div>
            )}
        </ul>
    );
};

export default NavList;
