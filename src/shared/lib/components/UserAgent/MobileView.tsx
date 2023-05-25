import type { ReactNode } from 'react'
import { UserAgent } from '@/shared/lib/components/UserAgent/UserAgent'

interface MobileViewProps {
  children?: ReactNode
}

export const MobileView = ({
  children,
}: MobileViewProps) => {
  return <UserAgent mobileView>{children}</UserAgent>
}
