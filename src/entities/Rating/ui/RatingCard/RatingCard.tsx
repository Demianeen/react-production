import { ToggleFeature } from '@/shared/lib/features'
import type { RatingCardDeprecatedProps } from './RatingCardDeprecated/RatingCardDeprecated'
import { RatingCardDeprecated } from './RatingCardDeprecated/RatingCardDeprecated'
import type { RatingCardRedesignedProps } from './RatingCardRedesigned/RatingCardRedesigned'
import { RatingCardRedesigned } from './RatingCardRedesigned/RatingCardRedesigned'

export interface RatingCardProps {
  className?: string
}

export const RatingCard = (
  props: RatingCardProps &
    (RatingCardRedesignedProps | RatingCardDeprecatedProps)
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<RatingCardRedesigned {...props} />}
      off={<RatingCardDeprecated {...props} />}
    />
  )
}
