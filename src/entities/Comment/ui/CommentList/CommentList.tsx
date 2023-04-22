import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import { CommentCardIsLoading } from '../CommentCardIsLoading/CommentCardIsLoading'
import styles from './CommentList.module.scss'
import { CommentCard } from '../CommentCard/CommentCard'
import type { Comment } from '../../model/types/comment'

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
        <section
          className={classNames(styles.commentList, {}, [
            className,
            styles.isLoading,
          ])}
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
        </section>
      )
    }

    return (
      <section
        className={classNames(styles.commentList, {}, [
          className,
        ])}
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
      </section>
    )
  }
)

CommentList.displayName = 'CommentList'
