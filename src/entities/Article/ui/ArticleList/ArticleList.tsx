import type { HTMLAttributeAnchorTarget } from 'react'
import React, { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ArticleListItem } from 'entities/Article/ui/ArticleListItem/ArticleListItem'
import { View } from 'entities/View'
import { Page } from 'widgets/Page'
import { Text, TextSize } from 'shared/ui/Text/Text'
import { useTranslation } from 'react-i18next'
import type { Article } from '../../model/types/article'
import styles from './ArticleList.module.scss'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'

interface ArticleListProps {
  className?: string
  articles: Article[]
  isLoading: boolean
  view?: View
  target?: HTMLAttributeAnchorTarget
}

const getArticleSkeletons = (view: View) => {
  const articleSkeletons = new Array(
    view === View.GRID ? 12 : 4
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
    view = View.GRID,
    target,
  }: ArticleListProps) => {
    const { t } = useTranslation('articles')
    const renderArticle = useCallback(
      (article: Article) => (
        <ArticleListItem
          article={article}
          view={view}
          key={article.id}
          target={target}
        />
      ),
      [view]
    )

    if (!isLoading && !articles.length) {
      return (
        <Page>
          <Text
            title={t('Articles not found')}
            size={TextSize.L}
          />
        </Page>
      )
    }

    return (
      <div
        className={classNames(styles.articleList, {}, [
          styles[view],
          className,
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
