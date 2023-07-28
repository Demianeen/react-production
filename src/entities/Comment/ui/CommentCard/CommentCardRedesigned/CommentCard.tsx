import { memo } from 'react'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { TestProps } from '@/shared/types/tests'
import type { Comment } from '../../../model/types/comment'

export interface CommentCardRedesignedProps extends TestProps {
  className?: string
  comment: Comment
}

export const CommentCardRedesigned = memo(
  ({
    className,
    comment,
    'data-testid': testId,
  }: CommentCardRedesignedProps) => {
    return (
      <HStack
        as='article'
        className={className}
        data-testid={testId}
        gap={1}
        align='start'
        maxWidth
      >
        <Avatar
          size='2rem'
          src={comment.user.avatar}
          user={comment.user}
          notShowUsername
        />
        {comment.body}
      </HStack>
    )
  }
)

CommentCardRedesigned.displayName = 'CommentCard'
