import type { ReactNode } from 'react'
import { useDevice } from '@/shared/lib/hooks/useDevice/useDevice'

interface UserAgentProps {
  children?: ReactNode
  mobileView: boolean
}

export const UserAgent = ({
  children,
  mobileView,
}: UserAgentProps) => {
  const isMobile = useDevice()
  console.log('isMobile', isMobile)
  console.log('mobileView', mobileView)

  if (mobileView === isMobile) {
    return <>{children}</>
  }

  return null
}
