import type { ReactNode } from 'react'
import { Media } from './Media'

interface MobileMediaProps {
  children?: ReactNode
}

/**
 * @returns component only if the viewport width is less than 768px
 */
export const MobileMedia = ({ children }: MobileMediaProps) => {
  return <Media mobile>{children}</Media>
}
