import type { FC, HTMLAttributeAnchorTarget } from 'react'
import { memo, useCallback, useEffect, useRef } from 'react'
import type { VirtuosoGridHandle } from 'react-virtuoso'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { useTranslation } from 'react-i18next'
import { View } from '@/entities/ListFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Text, TextSize } from '@/shared/ui/Text'
import type { Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListSkeleton } from './ArticleListSkeleton'
import styles from './ArticleList.module.scss'

export type OnOpenArticle = (arg: {
  article: Article
  index: number
}) => void

export type VirtualizedArticleListHeader = FC<{
  context?: VirtualizedArticleListContext
  className?: string
}>

interface VirtualizedArticleListProps {
  className?: string
  articles: Article[]
  isLoading: boolean
  skeletonsLimit: number
  view: View
  target?: HTMLAttributeAnchorTarget
  onLoadNextPart?: () => void
  Header?: VirtualizedArticleListHeader
  scrollParent?: HTMLElement | null
  startIndex?: number
  onOpenArticle?: OnOpenArticle
}

export interface VirtualizedArticleListContext {
  view: View
  isLoading: boolean
  skeletonsLimit: number
  Header?: VirtualizedArticleListHeader
}

const ArticlesNotFound = memo(() => {
  const { t } = useTranslation('articles')
  return <Text title={t('Articles not found')} size={TextSize.L} />
})
ArticlesNotFound.displayName = 'ArticlesNotFound'

const HeaderWithMargin = memo(
  ({ context }: { context?: VirtualizedArticleListContext }) => {
    if (!context?.Header) {
      return null
    }

    return <context.Header className={styles.header} />
  }
)
HeaderWithMargin.displayName = 'Header'

/**
 * Every component that wraps this component needs to have a height.
 * @return {React.NamedExoticComponent<VirtualizedArticleListProps>}
 */
export const VirtualizedArticleList = ({
  className,
  articles,
  isLoading,
  view = View.GRID,
  target,
  skeletonsLimit,
  onLoadNextPart,
  Header,
  scrollParent,
  startIndex,
  onOpenArticle,
}: VirtualizedArticleListProps) => {
  const gridRef = useRef<VirtuosoGridHandle | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (gridRef.current && startIndex && view === View.GRID) {
      timeout = setTimeout(() => {
        gridRef.current?.scrollToIndex(10)
      }, 100)
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [startIndex, view])

  const renderArticle = useCallback(
    (index: number, article: Article) => (
      <ArticleListItem
        article={article}
        view={view}
        key={article.id}
        target={target}
        className={styles.item}
        onOpenArticle={onOpenArticle}
        index={index}
      />
    ),
    [onOpenArticle, target, view]
  )

  const isArticlesNotFound = !isLoading && !articles.length

  if (view === View.LIST) {
    return (
      <Virtuoso<Article, VirtualizedArticleListContext>
        className={classNames(styles.list, {}, [className])}
        data={articles}
        itemContent={renderArticle}
        endReached={onLoadNextPart}
        components={{
          Header: HeaderWithMargin,
          Footer: isArticlesNotFound
            ? ArticlesNotFound
            : ArticleListSkeleton,
        }}
        context={{
          view: View.LIST,
          isLoading,
          skeletonsLimit,
          Header,
        }}
        customScrollParent={scrollParent ?? undefined}
        initialTopMostItemIndex={startIndex}
        role='feed'
        data-testid='VirtualizedArticleList.List'
      />
    )
  }

  return (
    <VirtuosoGrid<Article, VirtualizedArticleListContext>
      ref={gridRef}
      data={articles}
      itemContent={renderArticle}
      endReached={onLoadNextPart}
      components={{
        Header: HeaderWithMargin,
        Footer: isArticlesNotFound
          ? ArticlesNotFound
          : ArticleListSkeleton,
      }}
      listClassName={classNames(
        styles.grid,
        {
          [styles.notEmpty]: articles.length !== 0,
        },
        [className]
      )}
      context={{
        view: View.GRID,
        isLoading,
        skeletonsLimit,
        Header,
      }}
      customScrollParent={scrollParent ?? undefined}
      role='feed'
      data-testid='VirtualizedArticleList.Grid'
    />
  )
}
