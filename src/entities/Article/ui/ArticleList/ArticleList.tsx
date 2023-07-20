import type { HTMLAttributeAnchorTarget } from 'react'
import { memo, useCallback, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { View } from '@/entities/ListFilters'
import type { TestProps } from '@/shared/types/tests'
import { useArticleListSkeletons } from '../../model/lib/useArticleListSkeleton'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import type { Article } from '../../model/types/article'
import styles from './ArticleList.module.scss'

export interface ArticleListProps extends TestProps {
  className?: string
  articles: Article[]
  isLoading: boolean
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

    const [skeletonRef, setSkeletonRef] =
      useState<HTMLDivElement | null>(null)

    const skeletons = useArticleListSkeletons({
      view,
      className: styles.item,
      widthContainerRef: skeletonRef,
      heightContainerRef: skeletonRef,
    })

    return (
      <div
        className={classNames('', {}, [className, styles[view]])}
        data-testid={testId}
        ref={setSkeletonRef}
      >
        {articles.length > 0 ? articles.map(renderArticle) : null}
        {isLoading && skeletons}
      </div>
    )
  }
)

ArticleList.displayName = 'ArticleList'
