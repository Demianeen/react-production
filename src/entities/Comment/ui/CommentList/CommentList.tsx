import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/deprecated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ToggleFeature } from '@/shared/lib/features'
import { CommentCard } from '../CommentCard/CommentCard'
import type { Comment } from '../../model/types/comment'
import { CommentCardSkeleton } from '../CommentCard/CommentCardSkeleton'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(
  ({ className, comments, isLoading }: CommentListProps) => {
    const { t } = useTranslation()

    if (isLoading) {
      return (
        <VStack
          as='section'
          gap={1.25}
          maxWidth
          className={className}
        >
          <CommentCardSkeleton />
          <CommentCardSkeleton />
          <CommentCardSkeleton />
        </VStack>
      )
    }

    return (
      <VStack
        as='section'
        gap={1.25}
        maxWidth
        className={className}
        data-testid='CommentList'
      >
        {comments?.length !== 0 && comments ? (
          comments?.map((comment) => (
            <CommentCard
              comment={comment}
              key={comment.id}
              data-testid='CommentList.Item'
            />
          ))
        ) : (
          <ToggleFeature
            name='isAppRedesigned'
            on={
              <p data-testid='CommentList.NoComments'>
                {t('No comments yet')}
              </p>
            }
            off={
              <Text
                data-testid='CommentList.NoComments'
                text={t('No comments yet')}
              />
            }
          />
        )}
      </VStack>
    )
  }
)

CommentList.displayName = 'CommentList'
