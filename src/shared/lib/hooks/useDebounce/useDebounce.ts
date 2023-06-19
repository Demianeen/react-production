import { useCallback, useRef } from 'react'

/**
 * @description Cancel the previous call if the delay has not expired
 *
 * @template A
 * @param {(...args: A) => void} callback
 * @param {number} delay - debounce delay in ms
 * @returns {(...args: A) => void}
 */
export const useDebounce = <A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return useCallback(
    (...args: A) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        callback(...args)
      }, delay)
    },
    [callback, delay]
  )
}
