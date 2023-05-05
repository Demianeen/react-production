import type { HTMLAttributeAnchorTarget } from 'react'
import React, { memo, useCallback } from 'react'
import { View } from 'entities/View'
import { classNames } from 'shared/lib/classNames/classNames'
import { getArticleListSkeletons } from './ArticleListSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import type { Article } from '../../model/types/article'
import styles from './ArticleList.module.scss'

type ArticleListProps = {
  className?: string
  articles: Article[]
  isLoading: boolean
  limit: number
  view: View
  target?: HTMLAttributeAnchorTarget
}

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    view = View.GRID,
    target,
    limit,
  }: ArticleListProps) => {
    const renderArticle = useCallback(
      (article: Article) => (
        <ArticleListItem
          article={article}
          view={view}
          key={article.id}
          target={target}
          className={styles.item}
        />
      ),
      [target, view]
    )

    return (
      <div
        className={classNames(
          styles.articleListContainer,
          {},
          [className, styles[view]]
        )}
      >
        {articles.length > 0
          ? articles.map(renderArticle)
          : null}
        {isLoading && getArticleListSkeletons(view, limit)}
      </div>
    )
  }
)

ArticleList.displayName = 'ArticleList'
