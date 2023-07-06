import { memo } from 'react'
import type { Mods } from '@/shared/lib/classNames/classNames'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Skeleton } from '../Skeleton'
import styles from './Card.module.scss'

interface CardSkeletonProps {
  className?: string
  width?: string
  height?: string
  squared?: boolean
  maxWidth?: boolean
}

export const CardSkeleton = memo(
  ({
    className,
    width,
    height,
    maxWidth = false,
    squared = false,
  }: CardSkeletonProps) => {
    const mods: Mods = {
      [styles.border]: !squared,
      [styles.maxWidth]: maxWidth,
    }

    return (
      <Skeleton
        className={classNames(styles.card, mods, [className])}
        width={width}
        height={height}
      />
    )
  }
)

CardSkeleton.displayName = 'Card'
