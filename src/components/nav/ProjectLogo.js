import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title: {
        fontWeight: '700',
    },
    linkContainer: {
        background: 'transparent',
        paddingRight: theme.spacing(5),
    },
}));

const ProjectLogo = ({ style }) => {
    const styles = useStyles();

    return (
        <div className={style ? style : styles.linkContainer}>
            <Typography variant="h6" className={styles.title}>
                Cryptoneer
            </Typography>
        </div>
    );
};

export default ProjectLogo;
