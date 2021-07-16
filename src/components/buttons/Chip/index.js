import * as React from 'react';
import { Chip as MuiChip, useTheme } from '@material-ui/core';
import Text from '../../text/Text';
import { useStyles } from './styles';

/**
 *
 * @param text
 * @param avatar
 * @param props Mui Chip props
 */
const Chip = props => {
    const styles = useStyles();
    const theme = useTheme();

    return (
        <MuiChip
            {...props}
            className={`${styles.currenciesFilterChip} ${styles.currenciesFilterListChip}`}
            label={
                <div
                    className={styles.rowCenter}
                    style={{
                        height: '100%',
                    }}
                >
                    <Text size="small" className={styles.center}>
                        {props.text}
                    </Text>
                </div>
            }
            avatar={
                <div
                    style={{
                        marginRight: 0,
                        // marginLeft: 0,
                        marginLeft: theme.spacing(1),
                        width: theme.sizing.icon,
                        height: theme.sizing.icon,
                    }}
                    className={styles.center}
                >
                    {props.avatar}
                </div>
            }
        />
    );
};

export default Chip;
