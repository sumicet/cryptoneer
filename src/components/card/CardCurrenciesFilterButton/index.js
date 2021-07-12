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

const CardCurrenciesFilterButton = () => {
    const styles = useStyles();
    const theme = useTheme();

    const news = useData(state => state.news);

    const [currencies, setCurrencies] = useState(null);
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
        id: 'customized-hook-demo',
        defaultValue: [],
        multiple: true,
        options: curr,
        getOptionLabel: option => option.symbol,
        onChange: (e, selected) => {
            console.log(selected);
        },
    });

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

                        {value.map((option, index) => {
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
                                                    paddingLeft:
                                                        theme.spacing(1),
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    display: 'flex',
                                                    marginRight: 0,
                                                    marginLeft: 0,
                                                }}
                                            >
                                                <CurrencyLogo
                                                    path={option.path}
                                                />
                                            </div>
                                        }
                                    />
                                </Text>
                            );
                        })}
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
