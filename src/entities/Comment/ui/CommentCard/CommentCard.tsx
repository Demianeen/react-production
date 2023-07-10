import { ToggleFeature } from '@/shared/lib/features'
import { CommentCardDeprecated } from './CommentCardDeprecated/CommentCard'
import type { CommentCardRedesignedProps } from './CommentCardRedesigned/CommentCard'
import { CommentCardRedesigned } from './CommentCardRedesigned/CommentCard'

export interface CommentCardProps {
  className?: string
}

export const CommentCard = (
  props: CommentCardProps & CommentCardRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<CommentCardRedesigned {...props} />}
      off={<CommentCardDeprecated {...props} />}
    />
  )
}
