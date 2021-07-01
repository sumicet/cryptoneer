import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { ReactComponent as Astronaut } from '../../svg/other/Astronaut.svg';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '700',
    },
    linkContainer: {
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
    const theme = useTheme();
    console.log(
        parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)) *
            theme.typography.h6.lineHeightStep
    );
    // console.log(parseFloat(theme.typography.h6.fontSize.match(/\d*\.\d*/g)[0]) * );

    return (
        <div
            className={style ? style : styles.linkContainer}
            style={{ display: 'flex', flexDirection: 'row' }}
        >
            <Astronaut className={styles.logo} />
            <Typography variant="h6" className={styles.title}>
                Cryptoneer
            </Typography>
        </div>
    );
};

export default ProjectLogo;
