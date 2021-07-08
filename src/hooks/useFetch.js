/**
 *
 * @param reducer state => state.reducerName
 * @param fetch fetch function
 */

import { useEffect } from 'react';

/**
 *
 * @param fetch action
 */
export const useFetch = fetch => {
    return useEffect(() => {
        fetch();
    }, [fetch]);
};
