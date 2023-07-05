import { classNames } from '@/shared/lib/classNames/classNames'
import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { ReactElement } from 'react'
import styles from './StickyContentLayout.module.scss'

export interface StickyContentLayoutProps {
  className?: string
  right?: ReactElement
  left?: ReactElement
  content: ReactElement
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
        {content}
        {right && <div className={styles.right}>{right}</div>}
      </div>
    )
  }
)
