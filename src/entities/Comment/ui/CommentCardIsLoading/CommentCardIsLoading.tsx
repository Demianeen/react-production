import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import styles from '../CommentCard/CommentCard.module.scss'

interface CommentCardProps {
  className?: string
}

export const CommentCardIsLoading = memo(
  ({ className }: CommentCardProps) => {
    return (
      <div
        className={classNames(styles.commentCard, {}, [
          className,
          styles.isLoading,
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
  }
)

CommentCardIsLoading.displayName = 'CommentCardIsLoading'
