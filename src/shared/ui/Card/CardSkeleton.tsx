import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import styles from './Card.module.scss'

interface CardSkeletonProps {
  className?: string
  width?: string
  height?: string
}

export const CardSkeleton = memo(
  ({ className, width, height }: CardSkeletonProps) => {
    return (
      <Skeleton
        className={classNames(styles.card, {}, [className])}
        borderRadius='var(--border-radius)'
        width={width}
        height={height}
      />
    )
  }
)

CardSkeleton.displayName = 'Card'
