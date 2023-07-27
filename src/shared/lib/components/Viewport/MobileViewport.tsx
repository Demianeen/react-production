import type { ReactNode } from 'react'
import { Viewport } from './Viewport'

interface MobileViewportProps {
  children?: ReactNode
}

/**
 * @returns component only if the viewport width is less than 768px
 */
export const MobileViewport = ({ children }: MobileViewportProps) => {
  return <Viewport mobile>{children}</Viewport>
}
