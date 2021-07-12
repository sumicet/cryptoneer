import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    inputWrapper: {
        width: 200,
        height: theme.spacing(4),
        display: 'flex',
        flexWrap: 'wrap',
        background: theme.palette.background.notSelected,
        borderRadius: theme.shape.borderRadius,
        '&:hover': {
            background: theme.palette.background.selected,
        },
        '& .focused': {
            background: 'green',
        },
        // input container
        '& input': {
            background: 'transparent',
            width: 0,
            minWidth: 30,
            flex: 1,
            border: 0,
            margin: 0,
            outline: 0,
        },
    },
    chip: {
        marginLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingLeft: 0,
        '& svg': {
            margin: 0,
        },
    },
    dropdownChip: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: theme.spacing(1),
        cursor: 'pointer',
    },
    styledTag: {
        display: 'flex',
        alignItems: 'center',
        background: theme.palette.background.notSelected,

        '&:hover': {
            backgroundColor: theme.palette.button.hover,
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
            height: theme.typography.fontSize,
            width: theme.typography.fontSize,
            color: theme.palette.text.secondary,
        },
    },
    listbox: {
        width: 200,
        padding: theme.spacing(2),
        margin: 0,
        marginTop: theme.spacing(1),
        position: 'absolute',
        listStyle: 'none',
        background: theme.palette.background.notSelected,
        borderRadius: theme.shape.borderRadius,
        overflow: 'auto',
        maxHeight: 250,
        zIndex: 1,

        '& li': {
            display: 'flex',
            marginTop: theme.spacing(1),
            padding: 0,
            borderRadius: theme.shape.borderRadius,
            '&:first-child': {
                marginTop: 0,
            },
            '& span': {
                flexGrow: 1,
            },
            '& svg': {
                color: 'transparent',
            },
        },

        "& li[aria-selected='true']": {
            '& div': {
                background: theme.palette.background.selected,
                color: theme.palette.text.accentLight,
                fontWeight: 700,
            },
            '& svg': {
                color: theme.palette.text.accentLight,
            },
        },

        "& li[data-focus='true']": {
            background: theme.palette.background.selected,
            cursor: 'pointer',

            '& svg': {
                color: theme.palette.text.secondary,
            },
        },
    },
    input: {
        color: theme.palette.text.primary,
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        '&::placeholder': {
            color: theme.palette.text.hint,
        },
    },
}));

export { useStyles };
