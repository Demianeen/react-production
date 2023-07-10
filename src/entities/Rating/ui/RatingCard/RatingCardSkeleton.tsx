import { ToggleFeature } from '@/shared/lib/features'
import type { RatingCardSkeletonDeprecatedProps } from './RatingCardDeprecated/RatingCardSkeletonDeprecated'
import { RatingCardSkeletonDeprecated } from './RatingCardDeprecated/RatingCardSkeletonDeprecated'
import { RatingCardSkeletonRedesigned } from './RatingCardRedesigned/RatingCardSkeletonRedesigned'

export interface RatingCardProps {
  className?: string
}

export const RatingCardSkeleton = (
  props: RatingCardProps & RatingCardSkeletonDeprecatedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<RatingCardSkeletonRedesigned {...props} />}
      off={<RatingCardSkeletonDeprecated {...props} />}
    />
  )
}
