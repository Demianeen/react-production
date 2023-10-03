import type { ReactNode } from 'react'
import './CodeActionMenu.scss'
import { classNamesNew as classNames } from '@/shared/lib/classNames/classNamesNew'

export interface CodeActionMenuPosition {
  top: number
  right: number
}

export interface CodeActionMenuProps {
  className?: string
  position: CodeActionMenuPosition
  children?: ReactNode
}

export const CodeActionMenu = ({
  className,
  position,
  children,
}: CodeActionMenuProps) => {
  return (
    <div
      className={classNames('codeActionMenu', className)}
      style={position}
    >
      {children}
    </div>
  )
}
