import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    large: {
        fontWeight: 700,
    },
    medium: {
        fontWeight: 500,
        color: theme.palette.text.primary,
    },
    small: {
        fontSize: `${theme.typography.fontSize * 0.9}px`,
        color: theme.palette.text.secondary,
        fontWeight: 400,
    },
}));

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
