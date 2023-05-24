import { UserAgent } from 'shared/lib/components/UserAgent/UserAgent'
import type { ReactNode } from 'react'

interface MobileViewProps {
  children?: ReactNode
}

export const MobileView = ({
  children,
}: MobileViewProps) => {
  return <UserAgent mobileView>{children}</UserAgent>
}
