import { useCallback, useState } from 'react'
import { useMedia } from '../useMedia/useMedia'

/**
 * isMobile returns true if the viewport is mobile width (less than 768px)
 */
export const useViewport = () => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [])
  useMedia(handleResize)

  return { isMobile }
}
