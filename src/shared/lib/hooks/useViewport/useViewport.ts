import { useCallback, useState } from 'react'
import { useMedia } from '../useMedia/useMedia'

export const MOBILE_WIDTH = 768

/**
 * isMobile returns true if the viewport is mobile width (less than 768px)
 */
export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth < MOBILE_WIDTH) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])
  useMedia(handleResize)

  return { isMobile }
}
