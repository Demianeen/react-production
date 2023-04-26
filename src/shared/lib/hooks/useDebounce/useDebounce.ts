/* eslint-disable no-unused-vars */
import { MutableRefObject, useCallback, useRef } from 'react';

export function useDebounce(callback: (...args: any[]) => void, delay:number) {
    const timer = useRef(null) as MutableRefObject<any>;

    return useCallback((...args: any[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback();
        }, delay);
    }, [callback, delay]);
}
