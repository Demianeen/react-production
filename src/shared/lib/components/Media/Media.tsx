import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'
import { useMedia } from '../../hooks/useMedia/useMedia'

export interface MediaProps {
  children?: ReactNode
  mobile: boolean
}

/**
 * Checks if the media query matches the current viewport width
 * @returns if window width is less than 768px and mobile prop is true, returns the component. Or if window width is greater than 768px and mobile prop is false, returns the component
 */
export const Media = ({ mobile, children }: MediaProps) => {
  const [isMobile, setIsMobile] = useState(false)

  const handleResize = useCallback(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])
  useMedia(handleResize)

  if (mobile === isMobile) {
    return <>{children}</>
  }

  return null
}
