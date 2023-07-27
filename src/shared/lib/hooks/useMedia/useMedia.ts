import { useLayoutEffect } from 'react'

type OnResize = () => void

export const useMedia = (onResize: OnResize) => {
  // we need to use useLayoutEffect here because our computations and design depends on this hook
  useLayoutEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])
}
