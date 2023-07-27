import { typedMemo } from '@/shared/lib/react/typedMemo/typedMemo'
import { useCallback, useState, type ReactNode } from 'react'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { useMedia } from '@/shared/lib/hooks/useMedia/useMedia'
import styles from './StickyContentLayout.module.scss'

export interface StickyContentLayoutProps {
  className?: string
  right?: ReactNode
  left?: ReactNode
  content: ReactNode
  leftContainerClassName?: string
  rightContainerClassName?: string
  contentContainerClassName?: string
  /**
   * When the viewport width equal to it, layout will be rendered with display flex and flex direction column
   * @default false
   */
  layoutDisableWidth?: number
}

export const StickyContentLayout = typedMemo(
  ({
    className,
    right,
    left,
    content,
    leftContainerClassName,
    rightContainerClassName,
    contentContainerClassName,
    layoutDisableWidth,
  }: StickyContentLayoutProps) => {
    const [disableLayout, setDisableLayout] = useState(false)

    const onResize = useCallback(() => {
      if (layoutDisableWidth !== undefined) {
        if (window.innerWidth < layoutDisableWidth) {
          setDisableLayout(true)
        } else {
          setDisableLayout(false)
        }
      }
    }, [layoutDisableWidth])
    useMedia(onResize)

    return (
      <div
        className={classNamesNew(
          {
            [styles.hasLeft]: left !== undefined,
            [styles.hasRight]: right !== undefined,
            [styles.disabled]: disableLayout,
            [styles.stickyContentLayout]: !disableLayout,
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
        <div
          className={classNamesNew(
            styles.content,
            contentContainerClassName
          )}
        >
          {content}
        </div>
      </div>
    )
  }
)
