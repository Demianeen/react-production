import { memo } from 'react'
import { CardSkeleton } from '@/shared/ui/deprecated/Card'

export interface RatingCardSkeletonDeprecatedProps {
  className?: string
  squared?: boolean
  maxWidth?: boolean
}

export const RatingCardSkeletonDeprecated = memo(
  ({
    className,
    squared,
    maxWidth = false,
  }: RatingCardSkeletonDeprecatedProps) => {
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

RatingCardSkeletonDeprecated.displayName = 'RatingCardSkeleton'
