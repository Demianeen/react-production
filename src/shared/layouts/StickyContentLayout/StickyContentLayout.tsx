import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import type { ReactNode } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
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
  ({
    className,
    right,
    left,
    content,
    leftContainerClassName,
    rightContainerClassName,
  }: StickyContentLayoutProps) => {
    return (
      <div
        className={classNamesNew(
          styles.stickyContentLayout,
          {
            [styles.hasLeft]: left !== undefined,
            [styles.hasRight]: right !== undefined,
          },
          className
        )}
      >
        {left && (
          <div
            className={classNamesNew(
              styles.left,
              leftContainerClassName
            )}
          >
            {left}
          </div>
        )}
        {right && (
          <div
            className={classNamesNew(
              styles.right,
              rightContainerClassName
            )}
          >
            {right}
          </div>
        )}
        {content}
      </div>
    )
  }
)
