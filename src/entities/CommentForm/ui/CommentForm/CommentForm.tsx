import { ToggleFeature } from '@/shared/lib/features'
import type { CommentFormRedesignedProps } from './CommentFormRedesigned/CommentFormRedesigned'
import CommentFormRedesigned from './CommentFormRedesigned/CommentFormRedesigned'
import CommentFormDeprecated from './CommentFormDeprecated/CommentFormDeprecated'

export interface CommentFormProps {
  className?: string
}

const CommentForm = (
  props: CommentFormProps & CommentFormRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<CommentFormRedesigned {...props} />}
      off={<CommentFormDeprecated {...props} />}
    />
  )
}

export default CommentForm
