import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Text } from 'shared/ui/Text/Text'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import styles from './CommentCard.module.scss'
import type { Comment } from '../../model/types/comment'

interface CommentCardProps {
  className?: string
  comment: Comment
  isLoading?: boolean
}

export const CommentCard = memo(
  ({ className, comment, isLoading }: CommentCardProps) => {
    if (isLoading)
      return (
        <div
          className={classNames(styles.commentCard, {}, [
            className,
          ])}
        >
          <div className={styles.header}>
            <Skeleton
              width='2rem'
              height='2rem'
              borderRadius='50%'
              className={styles.avatar}
            />
            <Skeleton
              height='1rem'
              width='6rem'
              className={styles.username}
            />
          </div>
          <Skeleton height='4rem' width='100%' />
        </div>
      )
    return (
      <article
        className={classNames(styles.commentCard, {}, [
          className,
        ])}
      >
        <div className={styles.header}>
          {comment.user.avatar && (
            <Avatar
              size='2rem'
              src={comment.user.avatar}
              className={styles.avatar}
            />
          )}
          <Text
            className={styles.username}
            text={comment.user.username}
          />
        </div>
        <Text text={comment.body} />
      </article>
    )
  }
)

CommentCard.displayName = 'CommentCard'
