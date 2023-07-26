import type { ReactNode } from 'react'
import { useDevice } from '../../hooks/useDevice/useDevice'

interface UserAgentProps {
  children?: ReactNode
  mobileView: boolean
}

/**
 * @returns checks if the device has a touch screen and compares it with the mobileView prop to return the component if the condition is true
 */
export const UserAgent = ({
  children,
  mobileView,
}: UserAgentProps) => {
  const { isMobile } = useDevice()

  if (mobileView === isMobile) {
    return <>{children}</>
  }

  return null
}
