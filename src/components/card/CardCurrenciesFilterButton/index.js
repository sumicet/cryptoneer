import * as React from 'react';
import PropTypes from 'prop-types';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { styled, useTheme } from '@material-ui/core/styles';
import Error from '../../Error';
import { Chip, CircularProgress } from '@material-ui/core';
import { useData } from '../../../hooks/useData';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useStyles } from './styles';
import Text from '../../text/Text';
import { Close } from '@material-ui/icons';
import CurrencyLogo from '../../buttons/CurrencyLogo';
import { useMediaQuery } from '@material-ui/core';

const CardCurrenciesFilterButton = ({ onSelectedCurrencies }) => {
    const styles = useStyles();
    const theme = useTheme();

    const news = useData(state => state.news);

    const [currencies, setCurrencies] = useState([]);
    const curr = useSelector(state => state.news.currencies);

    useEffect(() => {
        setCurrencies(curr);
    }, [curr]);

    const {
        getRootProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        defaultValue: [],
        multiple: true,
        options: currencies,
        getOptionLabel: option => option.symbol,
        onChange: (e, selected) => {
            onSelectedCurrencies(selected);
        },
    });

    const resolutionIsXS = useMediaQuery(theme => theme.breakpoints.only('xs'));

    const Tags = () => {
        return (
            <>
                {value.map((option, index) => {
                    // I want to see 2 chips max (plus the count chip)
                    // on xs i just wanna see how many filters I applied
                    if (!resolutionIsXS && index <= 1) {
                        return (
                            <Text size="small">
                                <Chip
                                    {...getTagProps({ index })}
                                    className={`${styles.styledTag} ${styles.chip}`}
                                    label={
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexDirection: 'row',
                                            }}
                                        >
                                            {option.symbol.toUpperCase()}
                                        </div>
                                    }
                                    deleteIcon={
                                        <Close
                                            style={{
                                                width: theme.sizing.icon,
                                                height: theme.sizing.icon,
                                            }}
                                        />
                                    }
                                    avatar={
                                        <div
                                            style={{
                                                paddingLeft: theme.spacing(1),
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                display: 'flex',
                                                marginRight: 0,
                                                marginLeft: 0,
                                            }}
                                        >
                                            <CurrencyLogo path={option.path} />
                                        </div>
                                    }
                                />
                            </Text>
                        );
                    } else {
                        return null;
                    }
                })}
                {(resolutionIsXS || (!resolutionIsXS && value.length > 2)) && (
                    <Chip
                        label={
                            (resolutionIsXS ? value.length : value.length - 2) +
                            (!resolutionIsXS
                                ? ' more'
                                : value.length === 1
                                ? ' filter'
                                : ' filters')
                        }
                        style={{
                            marginLeft: theme.spacing(1),
                            background: theme.palette.background.selected,
                            display: 'grid',
                            placeItems: 'center',
                        }}
                    />
                )}
            </>
        );
    };

    return (
        <div>
            {news.error ? (
                <Error />
            ) : news.loading ? (
                <CircularProgress />
            ) : (
                <div>
                    <div
                        {...getRootProps()}
                        style={{
                            flexDirection: 'row',
                            display: 'flex',
                        }}
                    >
                        <div
                            ref={setAnchorEl}
                            className={`${focused ? 'focused' : ''} ${
                                styles.inputWrapper
                            }`}
                        >
                            <input
                                placeholder="Search..."
                                {...getInputProps()}
                                className={styles.input}
                            />
                        </div>

                        <div
                            style={{
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                display: 'flex',
                                overflow: 'hidden',
                                height: theme.spacing(4),
                            }}
                        >
                            <Tags />
                        </div>
                    </div>
                    {groupedOptions.length > 0 ? (
                        <div className={styles.listbox} {...getListboxProps()}>
                            {groupedOptions.map((option, index) => (
                                <li {...getOptionProps({ option, index })}>
                                    <Chip
                                        className={`${styles.styledTag} ${styles.dropdownChip}`}
                                        label={
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                }}
                                            >
                                                {option.symbol.toUpperCase()}
                                                <div
                                                    style={{
                                                        flex: 1,
                                                        justifyContent:
                                                            'flex-end',
                                                        alignItems: 'flex-end',
                                                        display: 'flex',
                                                    }}
                                                >
                                                    <CheckIcon
                                                        style={{
                                                            width: theme.sizing
                                                                .icon,
                                                            height: theme.sizing
                                                                .icon,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                        avatar={
                                            <CurrencyLogo path={option.path} />
                                        }
                                    />
                                </li>
                            ))}
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
};

export default CardCurrenciesFilterButton;
