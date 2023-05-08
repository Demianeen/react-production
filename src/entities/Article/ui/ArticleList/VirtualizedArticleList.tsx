import type {
  HTMLAttributeAnchorTarget,
  RefObject,
} from 'react'
import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { View } from 'entities/View'
import type { VirtuosoGridHandle } from 'react-virtuoso'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { useTranslation } from 'react-i18next'
import { Text, TextSize } from 'shared/ui/Text/Text'
import type { Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListSkeleton } from './ArticleListSkeleton'
import styles from './ArticleList.module.scss'

export type OnOpenArticle = (arg: {
  article: Article
  index: number
}) => void

interface VirtualizedArticleListProps {
  className?: string
  articles: Article[]
  isLoading: boolean
  limit: number
  view: View
  target?: HTMLAttributeAnchorTarget
  onLoadNextPart?: () => void
  Header?: React.FC<{
    context?: VirtualizedArticleListContext
  }>
  scrollParentRef?: RefObject<HTMLElement>
  startIndex?: number
  onOpenArticle?: OnOpenArticle
}

export interface VirtualizedArticleListContext {
  view: View
  isLoading: boolean
  limit: number
}

const ArticlesNotFound = memo(() => {
  const { t } = useTranslation('articles')
  return (
    <div>
      <Text
        title={t('Articles not found')}
        size={TextSize.L}
      />
    </div>
  )
})
ArticlesNotFound.displayName = 'ArticlesNotFound'

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
  limit,
  onLoadNextPart,
  Header,
  scrollParentRef,
  startIndex,
  onOpenArticle,
}: VirtualizedArticleListProps) => {
  const [scrollParent, setScrollParent] = useState<
    typeof scrollParentRef
  >({ current: null })
  const gridRef = useRef<VirtuosoGridHandle | null>(null)

  useEffect(() => {
    // scrollParentRef becomes undefined when the component is unmounted and mounted again
    // because scrollParentRef becomes available after the component is mounted but don't cause re-render
    if (scrollParent) {
      setScrollParent(scrollParentRef)
    }
  }, [scrollParent, scrollParentRef])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (
      gridRef.current &&
      startIndex &&
      view === View.GRID
    ) {
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
          Header,
          Footer: isArticlesNotFound
            ? ArticlesNotFound
            : ArticleListSkeleton,
        }}
        context={{ view: View.LIST, isLoading, limit }}
        overscan={200}
        customScrollParent={
          scrollParent?.current ?? undefined
        }
        initialTopMostItemIndex={startIndex}
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
        Header,
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
        limit,
      }}
      overscan={200}
      customScrollParent={
        scrollParent?.current ?? undefined
      }
    />
  )
}
