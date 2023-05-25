import type { ReactNode } from 'react'
import { UserAgent } from '@/shared/lib/components/UserAgent/UserAgent'

interface DesktopViewProps {
  children?: ReactNode
}

export const DesktopView = ({
  children,
}: DesktopViewProps) => {
  return (
    <UserAgent mobileView={false}>{children}</UserAgent>
  )
}
