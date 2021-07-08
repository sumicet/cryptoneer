import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import Text from '../text/Text';
import ProjectLogo from './ProjectLogo';

const useStyles = makeStyles(theme => ({
    footerWrapper: {
        flex: 0,
        display: 'grid',
        placeItems: 'center',
        background: theme.palette.background.light,
    },
    footer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        maxWidth: theme.sizing.maxWidth,
        // nav bar padding = body padding
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

const Footer = () => {
    const styles = useStyles();

    return (
        <AppBar position="static" className={styles.footerWrapper}>
            <Toolbar className={styles.footer}>
                <ProjectLogo />
                <Text size="medium">
                    © 2021 Cryptoneer. All rights reserved.
                </Text>
            </Toolbar>
        </AppBar>
    );
};

export default Footer;
