import { ToggleFeature } from '@/shared/lib/features'
import { CommentCardRedesignedSkeleton } from './CommentCardRedesigned/CommentCardSkeleton'
import { CommentCardDeprecatedSkeleton } from './CommentCardDeprecated/CommentCardSkeleton'

export interface CommentCardProps {
  className?: string
}

export const CommentCardSkeleton = (props: CommentCardProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<CommentCardRedesignedSkeleton {...props} />}
      off={<CommentCardDeprecatedSkeleton {...props} />}
    />
  )
}
