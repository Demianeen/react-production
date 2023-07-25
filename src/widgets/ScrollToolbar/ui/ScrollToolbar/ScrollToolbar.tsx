import { ScrollToTop } from '@/features/ScrollToTop'
import { memo } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import styles from './ScrollToolbar.module.scss'

interface ScrollToolbarProps {
  className?: string
}

export const ScrollToolbar = memo(
  ({ className }: ScrollToolbarProps) => {
    return (
      <ScrollToTop
        className={classNamesNew(styles.button, className)}
        tooltipPosition='left'
      />
    )
  }
)

ScrollToolbar.displayName = 'ScrollToolbar'
