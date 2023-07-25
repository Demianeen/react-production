import { useEffect } from 'react'

type OnResize = () => void

export const useMedia = (onResize: OnResize) => {
  useEffect(() => {
    onResize()
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [onResize])
}
