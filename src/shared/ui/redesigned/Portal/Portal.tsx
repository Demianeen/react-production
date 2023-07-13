import { getApp } from '@/shared/lib/react/getApp'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  element?: HTMLElement
}

export const Portal = ({
  children,
  element = getApp() ?? document.body,
}: PortalProps) => {
  return createPortal(children, element)
}
