import type { FC, HTMLAttributeAnchorTarget } from 'react'
import { memo, useCallback, useEffect, useRef } from 'react'
import type { VirtuosoGridHandle } from 'react-virtuoso'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { useTranslation } from 'react-i18next'
import { View } from '@/entities/ListFilters'
import { Text, TextSize } from '@/shared/ui/deprecated/Text'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { Title } from '@/shared/ui/redesigned/Title'
import { ToggleFeature } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'
import type { Article } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import styles from './ArticleList.module.scss'
import { useArticleListSkeletons } from '../../model/lib/useArticleListSkeleton'

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
  skeletonsAmount: number
  view: View
  target?: HTMLAttributeAnchorTarget
  onLoadNextPart?: () => void
  /**
   * @deprecated Not work in new layout, just specify header outside of this component
   */
  Header?: VirtualizedArticleListHeader
  /**
   * Parent that will be used for scrolling
   * @default window
   */
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
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={
        <HStack
          height='90svh'
          maxWidth
          justify='center'
          align='center'
        >
          <Title>{t('Articles not found')}</Title>
        </HStack>
      }
      off={<Text title={t('Articles not found')} size={TextSize.L} />}
    />
  )
})

ArticlesNotFound.displayName = 'ArticlesNotFound'

// TODO: Fix keyboard navigation

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
  skeletonsAmount,
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

  const skeletons = useArticleListSkeletons({
    view,
    skeletonsAmount,
    className: styles.item,
  })

  const isArticlesNotFound = !isLoading && !articles.length

  if (view === View.LIST) {
    const listClassName = classNamesNew(styles.list, className)

    return (
      <div>
        {Header && <Header className={styles.header} />}
        <Virtuoso<Article>
          className={listClassName}
          data={articles}
          itemContent={renderArticle}
          endReached={onLoadNextPart}
          overscan={500}
          customScrollParent={scrollParent ?? undefined}
          initialTopMostItemIndex={startIndex}
          role='feed'
          data-testid='VirtualizedArticleList.List'
          useWindowScroll
        />
        {isArticlesNotFound && <ArticlesNotFound />}
        {isLoading && (
          <div
            className={classNamesNew(listClassName, {
              [styles.listSkeleton]: articles.length !== 0,
            })}
          >
            {skeletons}
          </div>
        )}
      </div>
    )
  }

  const listClassName = classNamesNew(styles.grid, className)

  return (
    <div>
      {Header && <Header className={styles.header} />}
      <VirtuosoGrid<Article>
        ref={gridRef}
        data={articles}
        itemContent={renderArticle}
        endReached={onLoadNextPart}
        listClassName={listClassName}
        overscan={500}
        customScrollParent={scrollParent ?? undefined}
        role='feed'
        data-testid='VirtualizedArticleList.Grid'
        useWindowScroll
      />
      {isArticlesNotFound && <ArticlesNotFound />}
      {isLoading && (
        <div
          className={classNamesNew(listClassName, {
            [styles.gridSkeletons]: articles.length !== 0,
          })}
        >
          {skeletons}
        </div>
      )}
    </div>
  )
}
