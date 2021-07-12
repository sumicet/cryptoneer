import { Link as MuiLink, makeStyles } from '@material-ui/core';
import Text from '../Text';
import { useStyles } from './styles';

/**
 * @param children
 * @param onClick
 * @param TextProps
 */
const TextLink = props => {
    const { children } = props;
    const styles = useStyles();

    return (
        <MuiLink
            className={styles.link}
            style={
                props.style
                    ? { ...props.style, textDecoration: 'none' }
                    : { textDecoration: 'none' }
            }
            disableGutters
            {...props}
        >
            <Text
                {...props.TextProps}
                size={props.TextProps.size ? props.TextProps.size : 'medium'}
                className={
                    props.TextProps && props.TextProps.className
                        ? props.TextProps.className + ' ' + styles.linkText
                        : styles.linkText
                }
            >
                {children}
            </Text>
        </MuiLink>
    );
};

export default TextLink;
