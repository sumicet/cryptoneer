import { makeStyles } from '@material-ui/core';
import Text from '../text/Text';
import { CancelRounded } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    error: {
        flex: 1,
        display: 'flex',
        background: theme.palette.error.dark,
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorIcon: {
        color: theme.palette.text.primary,
        marginRight: theme.spacing(1),
    },
}));

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
                {children}
            </Text>
        </div>
    );
};

export default Error;
