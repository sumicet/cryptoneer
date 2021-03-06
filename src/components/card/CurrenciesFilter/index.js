import * as React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import { useTheme } from '@material-ui/core/styles';
import Error from '../../Error';
import { Chip as MuiChip, CircularProgress } from '@material-ui/core';
import { useData } from '../../../hooks/useData';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useStyles } from './styles';
import { CancelRounded, Check } from '@material-ui/icons';
import CurrencyLogo from '../../buttons/CurrencyLogo';
import { useMediaQuery } from '@material-ui/core';
import Chip from '../../buttons/Chip';

const CurrenciesFilter = ({ onSelectedCurrencies }) => {
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

    const ChipList = () => {
        return (
            <>
                {value.map((option, index) => {
                    // I want to see 2 chips max (plus the count chip)
                    // on xs i just wanna see how many filters I applied
                    if (!resolutionIsXS && index <= 1) {
                        return (
                            <li>
                                <Chip
                                    {...getTagProps({ index })}
                                    text={option.symbol.toUpperCase()}
                                    deleteIcon={
                                        <CancelRounded
                                            className={
                                                styles.currenciesFilterIcon
                                            }
                                            style={{
                                                marginRight: theme.spacing(1),
                                            }}
                                        />
                                    }
                                    avatar={<CurrencyLogo path={option.path} />}
                                />
                            </li>
                        );
                    } else {
                        return null;
                    }
                })}
                <li>
                    {(resolutionIsXS ||
                        (!resolutionIsXS && value.length > 2)) && (
                        <MuiChip
                            label={
                                (resolutionIsXS
                                    ? value.length
                                    : value.length - 2) +
                                (!resolutionIsXS
                                    ? ' more'
                                    : value.length === 1
                                    ? ' filter'
                                    : ' filters')
                            }
                            className={`${styles.currenciesFilterCount} ${styles.center}`}
                        />
                    )}
                </li>
            </>
        );
    };

    return (
        <>
            {news.error ? (
                <Error />
            ) : news.loading ? (
                <CircularProgress />
            ) : (
                <>
                    <div
                        {...getRootProps()}
                        className={styles.currenciesFilterWrapper}
                    >
                        <div
                            ref={setAnchorEl}
                            className={styles.currenciesFilterInputWrapper}
                        >
                            <input
                                placeholder="Search..."
                                {...getInputProps()}
                                className={styles.currenciesFilterInput}
                            />
                        </div>

                        <ul className={styles.currenciesFilterChipList}>
                            <ChipList />
                        </ul>
                    </div>
                    {groupedOptions.length > 0 ? (
                        <div className={styles.listbox} {...getListboxProps()}>
                            {groupedOptions.map((option, index) => (
                                <li {...getOptionProps({ option, index })}>
                                    <MuiChip
                                        className={`${styles.currenciesFilterChip} ${styles.currenciesFilterDropdownChip} ${styles.center}`}
                                        label={
                                            <div className={styles.rowCenter}>
                                                {option.symbol.toUpperCase()}
                                                <div
                                                    className={
                                                        styles.currenciesFilterIconWrapper
                                                    }
                                                >
                                                    <Check
                                                        className={
                                                            styles.currenciesFilterIcon
                                                        }
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
                </>
            )}
        </>
    );
};

export default CurrenciesFilter;
