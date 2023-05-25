import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card } from '@/shared/ui/Card/Card'
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton'
import { View } from '@/entities/ListFilters'
import { HStack, VStack } from '@/shared/ui/Stack'
import styles from './ArticleListItem.module.scss'

interface ArticleListItemSkeletonProps {
  className?: string
  view: View
}

export const ArticleListItemSkeleton = memo(
  ({ className, view }: ArticleListItemSkeletonProps) => {
    if (view === View.LIST) {
      return (
        <Card
          className={classNames(
            styles.articleListItem,
            {},
            [className, styles[view]]
          )}
          aria-busy
        >
          <VStack gap={0.5}>
            <HStack as='header' gap={0.5} maxWidth>
              <Skeleton
                width='2rem'
                height='2rem'
                borderRadius='50%'
              />
              <Skeleton
                height='var(--font-size-m)'
                width='15rem'
                className={styles.username}
              />
              <Skeleton
                height='var(--font-size-m)'
                width='7rem'
                className={styles.date}
              />
            </HStack>
            <Skeleton
              height='var(--font-size-l)'
              width='15rem'
              className={styles.title}
            />
            <Skeleton
              height='var(--font-size-m)'
              width='7rem'
              className={styles.types}
            />
            <Skeleton className={styles.img} />
            <Skeleton
              className={styles.skeleton}
              height='4rem'
            />
            <Skeleton className={styles.textBlock} />
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
        aria-busy
      >
        <div className={styles.imageWrapper}>
          <Skeleton className={styles.img} />
        </div>
        <HStack className={styles.infoWrapper} maxWidth>
          <Skeleton
            height='var(--font-size-m)'
            className={styles.types}
          />
        </HStack>
        <Skeleton
          className={styles.title}
          height='var(--font-size-l)'
        />
      </Card>
    )
  }
)

ArticleListItemSkeleton.displayName = 'ArticleListItem'
