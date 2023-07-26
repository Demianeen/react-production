import type { ReactNode } from 'react'
import { Media } from './Media'

interface DesktopMediaProps {
  children?: ReactNode
}

/**
 * @returns component only if the viewport width is greater than 768px
 */
export const DesktopMedia = ({ children }: DesktopMediaProps) => {
  return <Media mobile={false}>{children}</Media>
}
