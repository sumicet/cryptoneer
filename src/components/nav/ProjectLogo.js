import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { ReactComponent as Astronaut } from '../../svg/other/Astronaut.svg';
import Text from '../text/Text';

const useStyles = makeStyles(theme => ({
    logoContainer: {
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
    logo: {
        width: `${
            parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)[0]) *
            theme.typography.h6.lineHeight
        }rem`,
        height: `${
            parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)[0]) *
            theme.typography.h6.lineHeight
        }rem`,
        marginRight: theme.spacing(2),
    },
}));

const ProjectLogo = ({ style }) => {
    const styles = useStyles();

    return (
        <div
            className={style ? style : styles.logoContainer}
            style={{ display: 'flex', flexDirection: 'row' }}
        >
            <Astronaut className={styles.logo} />
            <Text size="extra-large">Cryptoneer</Text>
        </div>
    );
};

export default ProjectLogo;
