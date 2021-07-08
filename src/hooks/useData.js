import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * Gets access to the current state and returns it in real time.
 * @param reducer state => state.reducerName
 */
export const useData = reducer => {
    const state = useSelector(reducer);

    // ******************* LOADING ******************
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (state.loading === true) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [state.loading]);

    // ******************* SET DATA & HANDLE ERRORS ******************

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        if (state.data && state.error === null) {
            setData(state.data);
        } else {
            if (state.error) {
                setError(state.error);
            }
        }
    }, [state.data, state.error]);

    return useMemo(() => {
        return {
            data,
            loading,
            error,
        };
    }, [data, error, loading]);
};
