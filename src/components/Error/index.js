import { makeStyles } from '@material-ui/core';
import Text from '../text/Text';
import { CancelRounded } from '@material-ui/icons';
import { useStyles } from './styles';
/**
 *
 * @param children
 * @param TextProps
 */
const Error = props => {
    const { children, TextProps } = props;
    const styles = useStyles();

    return (
        <div
            className={
                props.className
                    ? styles.error + ' ' + props.className
                    : styles.error
            }
            {...props}
        >
            <CancelRounded className={styles.errorIcon} />
            <Text size="medium" {...TextProps}>
                {children
                    ? children
                    : 'Oops, an error occured. Please refresh the page.'}
            </Text>
        </div>
    );
};

export default Error;
