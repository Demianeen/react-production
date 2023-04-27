import { useCallback, useRef } from 'react'

export const useThrottle = <A extends unknown[]>(
  callback: (...args: A) => void,
  delay: number
): ((...args: A) => void) => {
  const throttleRef = useRef(false)
  return useCallback(
    (...args: A) => {
      if (!throttleRef.current) {
        throttleRef.current = true
        callback(...args)
        setTimeout(() => {
          throttleRef.current = false
        }, delay)
      }
    },
    [callback, delay]
  )
}
