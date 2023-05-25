import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Text } from '@/shared/ui/Text/Text'
import { VStack } from '@/shared/ui/Stack'
import styles from './CommentList.module.scss'
import { CommentCard } from '../CommentCard/CommentCard'
import type { Comment } from '../../model/types/comment'
import { CommentCardIsLoading } from '../CommentCard/CommentCardIsLoading'

interface CommentListProps {
  className?: string
  comments?: Comment[]
  isLoading?: boolean
}

export const CommentList = memo(
  ({
    className,
    comments,
    isLoading,
  }: CommentListProps) => {
    const { t } = useTranslation()

    if (isLoading) {
      return (
        <VStack
          as='section'
          gap={1.25}
          maxWidth
          className={className}
        >
          <CommentCardIsLoading
            className={styles.comment}
          />
          <CommentCardIsLoading
            className={styles.comment}
          />
          <CommentCardIsLoading
            className={styles.comment}
          />
        </VStack>
      )
    }

    return (
      <VStack
        as='section'
        gap={1.25}
        maxWidth
        className={className}
      >
        {comments ? (
          comments.map((comment) => (
            <CommentCard
              className={styles.comment}
              comment={comment}
              key={comment.id}
            />
          ))
        ) : (
          <Text text={t('No comments yet')} />
        )}
      </VStack>
    )
  }
)

CommentList.displayName = 'CommentList'
