import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import type { View } from '@/entities/ListFilters'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import styles from './ArticleList.module.scss'

interface VirtualizedArticleListSkeletonProps {
  className?: string
  view: View
  skeletonsLimit: number
}

export const getArticleListSkeletons = (
  view: View,
  limit: number | undefined
) => {
  const articleSkeletons = new Array(limit).fill(null)

  return articleSkeletons.map((_, index) => (
    <ArticleListItemSkeleton
      view={view}
      className={styles.item}
      /* eslint-disable-next-line react/no-array-index-key */
      key={index}
    />
  ))
}

export const ArticleListSkeleton = memo(
  ({
    view,
    skeletonsLimit,
    className,
  }: VirtualizedArticleListSkeletonProps) => {
    return (
      <div
        className={classNames(styles.skeleton, {}, [
          styles[view],
          className,
        ])}
      >
        {getArticleListSkeletons(view, skeletonsLimit)}
      </div>
    )
  }
)

ArticleListSkeleton.displayName = 'ArticleListSkeleton'
