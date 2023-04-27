import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem'
import type { Article } from '../../model/types/article'
import { ArticleView } from '../../model/types/article'
import styles from './ArticleList.module.scss'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading: boolean
  view?: ArticleView
}

const getArticleSkeletons = (view: ArticleView) => {
  const articleSkeletons = new Array(
    view === ArticleView.GRID ? 12 : 4
  ).fill(null)

  return articleSkeletons.map((_, index) => (
    <ArticleListItemSkeleton
      /* eslint-disable-next-line react/no-array-index-key */
      key={index}
      view={view}
    />
  ))
}

export const ArticleList = memo(
  ({
    className,
    articles,
    isLoading,
    view = ArticleView.GRID,
  }: ArticleListProps) => {
    const renderArticle = useCallback(
      (article: Article) => (
        <ArticleListItem
          article={article}
          view={view}
          key={article.id}
        />
      ),
      [view]
    )

    return (
      <div
        className={classNames(styles.articleList, {}, [
          className,
          styles[view],
        ])}
      >
        {articles.length > 0
          ? articles.map(renderArticle)
          : null}
        {isLoading && getArticleSkeletons(view)}
      </div>
    )
  }
)

ArticleList.displayName = 'ArticleList'
