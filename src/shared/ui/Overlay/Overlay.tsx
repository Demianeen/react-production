import React from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Overlay.module.scss'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay = ({ className, onClick }: OverlayProps) => {
  return (
    <div
      className={classNames(styles.overlay, {}, [className])}
      onClick={onClick}
    />
  )
}
