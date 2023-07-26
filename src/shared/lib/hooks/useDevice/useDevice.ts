import { useCallback, useState } from 'react'
import { useMedia } from '../useMedia/useMedia'

/**
 * Check if the device has a touch screen
 * @returns {isMobile: boolean}
 */
export const useDevice = () => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    setIsMobile(window.matchMedia('(pointer:coarse)').matches)
  }, [])

  useMedia(handleResize)

  return { isMobile }
}
