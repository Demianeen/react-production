import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { View } from 'entities/ListFilters'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import styles from './ArticleList.module.scss'
import type { VirtualizedArticleListContext } from './VirtualizedArticleList'

interface VirtualizedArticleListSkeletonProps {
  className?: string
  context?: VirtualizedArticleListContext
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
    context,
    className,
  }: VirtualizedArticleListSkeletonProps) => {
    const {
      view = View.GRID,
      isLoading = false,
      skeletonsLimit = 4,
    } = context ?? {}

    if (!isLoading) {
      return null
    }

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
