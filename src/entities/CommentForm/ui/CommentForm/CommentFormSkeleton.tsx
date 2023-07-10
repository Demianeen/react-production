import { ToggleFeature } from '@/shared/lib/features'
import { CommentFormDeprecatedSkeleton } from './CommentFormDeprecated/CommentFormSkeleton'
import { CommentFormRedesignedSkeleton } from './CommentFormRedesigned/CommentFormSkeleton'

export interface CommentFormProps {
  className?: string
}

export const CommentFormSkeleton = (props: CommentFormProps) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<CommentFormRedesignedSkeleton {...props} />}
      off={<CommentFormDeprecatedSkeleton {...props} />}
    />
  )
}
