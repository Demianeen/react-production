import type { ReactNode } from 'react'
import { useViewport } from '../../hooks/useViewport/useViewport'

export interface MediaProps {
  children?: ReactNode
  mobile: boolean
}

/**
 * Checks if the media query matches the current viewport width
 * @returns if window width is less than 768px and mobile prop is true, returns the component. Or if window width is greater than 768px and mobile prop is false, returns the component
 */
export const Viewport = ({ mobile, children }: MediaProps) => {
  const { isMobile } = useViewport()

  if (mobile === isMobile) {
    return <>{children}</>
  }

  return null
}
