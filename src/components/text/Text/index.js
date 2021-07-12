import { Typography } from '@material-ui/core';
import { useStyles } from './styles';
/**
 *
 * @param className
 * @param size 'extra-large' | 'large' | 'small'
 */
const Text = props => {
    const { size } = props;
    const styles = useStyles();

    const className = props.className ? props.className.toString() : '';

    const classNameFromSize =
        size === 'extra-large' || size === 'large'
            ? styles.large
            : size === 'medium'
            ? styles.medium
            : size === 'small'
            ? styles.small
            : '';

    return (
        <Typography
            {...props}
            variant={
                size === 'extra-large'
                    ? 'h6'
                    : size === 'large'
                    ? 'body1'
                    : size === 'medium'
                    ? 'body2'
                    : size === 'small'
                    ? 'body2'
                    : props.variant
            }
            className={`${classNameFromSize} ${className}`}
        >
            {props.children}
        </Typography>
    );
};

export default Text;
