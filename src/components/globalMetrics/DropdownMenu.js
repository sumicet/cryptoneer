import React from 'react';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core';
import Button from '../buttons/Button';

const useStyles = makeStyles(theme => ({
    dropdownMenu: {
        zIndex: 100,
    },
    chartButtonText: {
        fontWeight: 700,
    },
    chartButtonList: {
        display: 'flex',
        flexDirection: 'row',
        background: `linear-gradient(${theme.palette.background.cardLight}, ${theme.palette.background.cardDark})`,
        width: 'max-content',
        borderRadius: theme.shape.borderRadius,
        overflow: 'hidden',
    },
}));

export default function DropdownMenu({ options }) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    const styles = useStyles();

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <Grid
            container
            direction="column"
            alignItems="center"
            className={`${styles.dropdownMenu} ${styles.chartButtonList}`}
        >
            <Grid item xs={12}>
                <ButtonGroup
                    disableElevation
                    variant="text"
                    color="primary"
                    ref={anchorRef}
                >
                    <Button
                        onClick={handleClick}
                        disableMargins
                        className={styles.chartButton}
                        TextProps={{
                            className: `${styles.chartButtonText}`,
                        }}
                    >
                        {options[selectedIndex]}
                    </Button>
                    <Button
                        disableMargins
                        className={styles.chartButton}
                        TextProps={{
                            className: `${styles.chartButtonText}`,
                        }}
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon />
                    </Button>
                </ButtonGroup>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom'
                                        ? 'center top'
                                        : 'center bottom',
                            }}
                        >
                            <div className={styles.chartButtonList}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu">
                                        {options.map((option, index) => (
                                            <MenuItem
                                                key={option}
                                                disabled={index === 2}
                                                selected={
                                                    index === selectedIndex
                                                }
                                                onClick={event =>
                                                    handleMenuItemClick(
                                                        event,
                                                        index
                                                    )
                                                }
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </div>
                        </Grow>
                    )}
                </Popper>
            </Grid>
        </Grid>
    );
}
