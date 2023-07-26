import type { ReactNode } from 'react'
import { UserAgent } from './UserAgent'

interface DesktopViewProps {
  children?: ReactNode
}

/**
 * @returns a component only if device don't have a touch screen
 */
export const DesktopView = ({ children }: DesktopViewProps) => {
  return <UserAgent mobileView={false}>{children}</UserAgent>
}
