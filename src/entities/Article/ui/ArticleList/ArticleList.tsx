import type { HTMLAttributeAnchorTarget } from 'react'
import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { View } from '@/entities/ListFilters'
import type { TestProps } from '@/shared/types/tests'
import {
  ArticleListSkeleton,
  getArticleListSkeletons,
} from './ArticleListSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import type { Article } from '../../model/types/article'
import styles from './ArticleList.module.scss'

interface ArticleListProps extends TestProps {
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
    'data-testid': testId = 'ArticleList',
  }: ArticleListProps) => {
    const renderArticle = useCallback(
      (article: Article) => (
        <ArticleListItem
          article={article}
          view={view}
          key={article.id}
          target={target}
          className={styles.item}
          data-testid={`${testId}.Item`}
        />
      ),
      [target, testId, view]
    )

    if (isLoading) {
      return (
        <ArticleListSkeleton
          context={{
            isLoading: true,
            view,
            skeletonsLimit: limit,
          }}
          className={className}
        />
      )
    }

    return (
      <div
        className={classNames(
          styles.articleListContainer,
          {},
          [className, styles[view]]
        )}
        data-testid={testId}
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
