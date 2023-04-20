import { useEffect } from 'react'

export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      callback()
    }
    // useEffect should be called only once when component is mounted
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
