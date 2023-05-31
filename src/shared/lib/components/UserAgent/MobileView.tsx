import type { ReactNode } from 'react'
import { UserAgent } from './UserAgent'

interface MobileViewProps {
  children?: ReactNode
}

export const MobileView = ({
  children,
}: MobileViewProps) => {
  return <UserAgent mobileView>{children}</UserAgent>
}
