import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { ReactNode } from 'react'
import styles from './StickyContentLayout.module.scss'

export interface StickyContentLayoutProps {
  className?: string
  right?: ReactNode
  left?: ReactNode
  content: ReactNode
  leftContainerClassName?: string
  rightContainerClassName?: string
}

export const StickyContentLayout = typedMemo(
  ({ className, right, left, content }: StickyContentLayoutProps) => {
    return (
      <div
        className={classNames(styles.stickyContentLayout, {}, [
          className,
        ])}
      >
        {left && <div className={styles.left}>{left}</div>}
        {right && <div className={styles.right}>{right}</div>}
        {content}
      </div>
    )
  }
)
