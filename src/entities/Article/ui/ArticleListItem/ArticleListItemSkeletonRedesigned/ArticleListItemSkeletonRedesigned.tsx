import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/redesigned/Card'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { View } from '@/entities/ListFilters'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import styles from '../ArticleListItemRedesigned/ArticleListItemRedesigned.module.scss'

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
            <HStack as='header' gap={0.5} maxWidth>
              <Skeleton variant='circular' size='2rem' />
              <Skeleton
                variant='text'
                width='5rem'
                className={styles.username}
              />
              <Skeleton
                variant='text'
                width='7rem'
                className={styles.date}
              />
            </HStack>
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
          <HStack gap={0.25} className={styles.avatar}>
            <Skeleton variant='circular' size='2rem' />
            <Skeleton variant='text' width='5rem' />
          </HStack>
        </VStack>
      </Card>
    )
  }
)

ArticleListItemSkeletonRedesigned.displayName = 'ArticleListItem'
