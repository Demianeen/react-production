import type { CSSProperties } from 'react'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import styles from './Skeleton.module.scss'

interface SkeletonProps {
  className?: string
  height?: string
  width?: string
  /**
   * @description Border radius of skeleton
   */
  borderRadius?: string
  noShrink?: boolean
}

/**
 * Use components from redesigned folder
 * @deprecated
 */
export const Skeleton = memo(
  ({
    className,
    height,
    width,
    borderRadius,
    noShrink,
  }: SkeletonProps) => {
    const style: CSSProperties = {
      height,
      width,
      borderRadius,
      flexShrink: noShrink ? 0 : undefined,
    }

    return (
      <div
        className={classNames(styles.skeleton, {}, [className])}
        style={style}
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
