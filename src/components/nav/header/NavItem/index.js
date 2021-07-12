import { Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '../../../buttons/Button';
import SearchBar from '../SearchBar';
import Logo from '../Logo';
import Text from '../../../text/Text';
import { useStyles } from './styles';

const NavList = ({ toggleDrawer }) => {
    const styles = useStyles();
    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

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
            <li className={styles.navItem + ' ' + styles.navLinkWrapper}>
                <Link to="/home" className={styles.navLink}>
                    <Text size="large">Home</Text>
                </Link>
            </li>
            <li className={styles.navItem + ' ' + styles.navLinkWrapper}>
                <Link to="/news" className={styles.navLink}>
                    <Text size="large">News</Text>
                </Link>
            </li>
            {!resolutionIsXS && (
                <div className={styles.navSearchBar}>
                    <SearchBar />
                </div>
            )}
        </ul>
    );
};

export default NavList;
