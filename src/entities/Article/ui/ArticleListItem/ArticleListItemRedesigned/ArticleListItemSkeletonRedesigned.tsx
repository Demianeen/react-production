import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/redesigned/Card'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { View } from '@/entities/ListFilters'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { AvatarSkeleton } from '@/shared/ui/redesigned/Avatar/AvatarSkeleton'
import styles from './ArticleListItemRedesigned.module.scss'

export interface ArticleListItemSkeletonRedesignedProps {
  className?: string
  view: View
}

export const ArticleListItemSkeletonRedesigned = memo(
  ({ className, view }: ArticleListItemSkeletonRedesignedProps) => {
    if (view === View.LIST) {
      return (
        <Card
          className={classNames(styles.articleListItem, {}, [
            className,
            styles[view],
          ])}
          aria-busy
        >
          <VStack gap={0.5}>
            <AvatarSkeleton user textWidth='10rem' />
            <Skeleton height='title' variant='text' />
            <Skeleton height='l2title' variant='text' width='20rem' />
            <Skeleton className={styles.img} />
            <Skeleton height='4rem' />
            <HStack
              as='footer'
              justify='between'
              className={styles.footer}
              maxWidth
            >
              <Skeleton height='2rem' width='10rem' />
            </HStack>
          </VStack>
        </Card>
      )
    }

    return (
      <Card
        className={classNames(styles.articleListItem, {}, [
          className,
          styles[view],
        ])}
        role='link'
        padding={0}
        aria-busy
      >
        <Skeleton className={styles.img} />
        <VStack gap={0.5} className={styles.textWrapper}>
          <Skeleton
            variant='text'
            height='l2title'
            numberOfLines={3}
          />
          <HStack
            className={styles.infoWrapper}
            justify='between'
            maxWidth
          >
            <Skeleton variant='text' />
          </HStack>
          <AvatarSkeleton
            user
            textWidth='5rem'
            className={styles.avatar}
          />
        </VStack>
      </Card>
    )
  }
)

ArticleListItemSkeletonRedesigned.displayName = 'ArticleListItem'
