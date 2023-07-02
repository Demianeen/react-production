import { memo } from 'react'
import { CardSkeleton } from '@/shared/ui/deprecated/Card'

interface RatingCardSkeletonProps {
  className?: string
  squared?: boolean
  maxWidth?: boolean
}

export const RatingCardSkeleton = memo(
  ({
    className,
    squared,
    maxWidth = false,
  }: RatingCardSkeletonProps) => {
    return (
      <CardSkeleton
        className={className}
        squared={squared}
        maxWidth={maxWidth}
        height='7.375rem'
      />
    )
  }
)

RatingCardSkeleton.displayName = 'RatingCardSkeleton'
