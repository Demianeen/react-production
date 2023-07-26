import type { ReactNode } from 'react'
import { Viewport } from './Viewport'

interface DesktopViewportProps {
  children?: ReactNode
}

/**
 * @returns component only if the viewport width is greater than 768px
 */
export const DesktopViewport = ({
  children,
}: DesktopViewportProps) => {
  return <Viewport mobile={false}>{children}</Viewport>
}
