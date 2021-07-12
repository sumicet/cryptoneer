import { Button as MuiButton } from '@material-ui/core';
import { useStyles } from './styles';
import Text from '../../text/Text';

/**
 * @param children an icon.
 * @param size "small", "large". Default "small".
 */

/**
 *
 * @param children
 * @param size
 * @param text
 * @param TextProps
 * @param disableMargins
 * @param props other props passed down to MuiButton
 */
const Button = props => {
    const { children, size, text, disableMargins, TextProps, className } =
        props;
    const styles = useStyles();
    return (
        <>
            <MuiButton
                {...props}
                className={`${styles.button} ${
                    !disableMargins ? styles.buttonMargin : ''
                } ${className ? className : ''}`}
                size={size ? size : 'small'}
            >
                {children}
                {text && (
                    <Text
                        {...TextProps}
                        className={`${styles.buttonText} ${
                            TextProps && TextProps.className
                                ? TextProps.className
                                : ''
                        }`}
                        size={size ? size : 'small'}
                        component="span"
                    >
                        {text}
                    </Text>
                )}
            </MuiButton>
        </>
    );
};

export default Button;
