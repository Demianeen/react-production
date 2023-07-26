import type { ReactNode } from 'react'
import { UserAgent } from './UserAgent'

interface MobileViewProps {
  children?: ReactNode
}

/**
 * @returns a component only if device has a touch screen
 */
export const MobileView = ({ children }: MobileViewProps) => {
  return <UserAgent mobileView>{children}</UserAgent>
}
