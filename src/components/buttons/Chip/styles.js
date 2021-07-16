import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    currenciesFilterListChip: {
        marginLeft: theme.spacing(1),
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(0.5),
        '& svg': {
            margin: 0,
        },
    },
    currenciesFilterChip: {
        display: 'flex',
        alignItems: 'center',

        // fix color changing to gray after clicking on button
        '& .MuiChip-clickable:hover, .MuiChip-clickable:focus': {
            background: 'none',
        },
        // chip text container
        '& span': {
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1),
        },

        '& svg': {
            cursor: 'pointer',
            color: theme.palette.text.secondary,
        },
    },
    rowCenter: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },
}));

export { useStyles };
