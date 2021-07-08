/**
 *
 * @param reducer state => state.reducerName
 * @param fetch fetch function
 */

import { useEffect } from 'react';

export const useFetch = fetch => {
    return useEffect(() => {
        fetch();
    }, [fetch]);
};
