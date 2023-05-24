import { useCallback, useRef } from 'react'

export const useDebounce = <A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
) => {
  const timerRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)

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
