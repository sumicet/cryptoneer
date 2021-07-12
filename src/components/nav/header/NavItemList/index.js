import { Typography, makeStyles, useMediaQuery } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Button from '../../../buttons/Button';
import SearchBar from '../SearchBar';
import ProjectLogo from '../ProjectLogo';
import Text from '../../../text/Text';
import { useStyles } from './styles';

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
                    <Text size="large">Home</Text>
                </Link>
            </div>
            <div className={styles.navItemList + ' ' + styles.navLinkWrapper}>
                <Link to="/news" className={styles.navLink}>
                    <Text size="large">News</Text>
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
