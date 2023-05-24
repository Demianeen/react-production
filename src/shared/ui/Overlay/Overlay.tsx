import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import styles from './Overlay.module.scss'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay = memo(
  ({ className, onClick }: OverlayProps) => {
    return (
      <div
        className={classNames(styles.overlay, {}, [
          className,
        ])}
        onClick={onClick}
      />
    )
  }
)

Overlay.displayName = 'Overlay'
