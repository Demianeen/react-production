import { memo } from 'react'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'

interface RatingCardSkeletonRedesignedProps {
  className?: string
}

export const RatingCardSkeletonRedesigned = memo(
  ({ className }: RatingCardSkeletonRedesignedProps) => {
    return <Skeleton className={className} height='7.375rem' />
  }
)

RatingCardSkeletonRedesigned.displayName = 'RatingCardSkeleton'
