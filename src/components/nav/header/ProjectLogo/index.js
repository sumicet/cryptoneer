import { ReactComponent as Astronaut } from '../../../../svg/other/Astronaut.svg';
import Text from '../../../text/Text';
import { useStyles } from './styles';

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
