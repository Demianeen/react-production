import type { ReactNode } from 'react'
import { useDevice } from 'shared/lib/hooks/useDevice/useDevice'

interface UserAgentProps {
  children?: ReactNode
  mobileView: boolean
}

export const UserAgent = ({
  children,
  mobileView,
}: UserAgentProps) => {
  const isMobile = useDevice()

  if (mobileView === isMobile) {
    return <>{children}</>
  }

  return null
}
