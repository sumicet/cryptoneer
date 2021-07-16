import * as React from 'react';
import { Chip as MuiChip, useTheme } from '@material-ui/core';
import Text from '../../text/Text';
import { useStyles } from './styles';
import { makeStyles } from '@material-ui/core';

/**
 *
 * @param text
 * @param avatar
 * @param background color
 * @param props Mui Chip props
 */
const Chip = props => {
    const styles = useStyles();
    const theme = useTheme();

    const useStylesAdd = makeStyles({
        chipCustom: {
            background: props.background
                ? props.background
                : theme.palette.background.notSelected,

            '&:hover': {
                background: theme.palette.button.hover,
            },
        },
    });

    const stylesAdd = useStylesAdd();

    return (
        <MuiChip
            {...props}
            className={`${styles.currenciesFilterChip} ${styles.currenciesFilterListChip} ${stylesAdd.chipCustom}`}
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
            clickable
        />
    );
};

export default Chip;
