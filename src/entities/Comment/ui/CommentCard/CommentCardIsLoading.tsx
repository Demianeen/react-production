import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import styles from './CommentCard.module.scss'

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
        <header className={styles.header}>
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
        </header>
        <Skeleton height='4rem' width='100%' />
      </div>
    )
  }
)

CommentCardIsLoading.displayName = 'CommentCardIsLoading'
