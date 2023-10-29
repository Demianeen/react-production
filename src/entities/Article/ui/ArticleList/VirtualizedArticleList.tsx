import type { FC, HTMLAttributeAnchorTarget } from 'react'
import {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import type {
  VirtuosoGridHandle,
  VirtuosoHandle,
} from 'react-virtuoso'
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso'
import { useTranslation } from 'react-i18next'
import { View } from '@/entities/View'
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

/**
 * Every component that wraps this component needs to have a height.
 * @return {React.NamedExoticComponent<VirtualizedArticleListProps>}
 */
export const VirtualizedArticleList = forwardRef<
  VirtuosoGridHandle | VirtuosoHandle,
  VirtualizedArticleListProps
>(
  (
    {
      className,
      articles,
      isLoading,
      view = View.GRID,
      target,
      onLoadNextPart,
      Header,
      scrollParent,
      startIndex,
      onOpenArticle,
    },
    ref,
  ) => {
    const gridRef = useRef<VirtuosoGridHandle | null>(null)
    const listRef = useRef<VirtuosoHandle | null>(null)

    const [currentItemIndex, setCurrentItemIndex] = useState(-1)

    const isListView = view === View.LIST

    useImperativeHandle(
      ref,
      () => {
        if (isListView) {
          return listRef.current as VirtuosoHandle
        }
        return gridRef.current as VirtuosoGridHandle
      },
      [isListView],
    )

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
      [onOpenArticle, target, view],
    )

    const [containerRef, setContainerRef] =
      useState<HTMLDivElement | null>(null)

    const skeletons = useArticleListSkeletons({
      view,
      className: styles.item,
      containerRef,
    })

    const isArticlesNotFound = !isLoading && !articles.length

    const listKeyDownCallback = useCallback(
      (e: KeyboardEvent) => {
        let nextIndex: number | null = null

        if (e.code === 'ArrowUp') {
          nextIndex = Math.max(0, currentItemIndex - 1)
        } else if (e.code === 'ArrowDown') {
          nextIndex = Math.min(articles.length, currentItemIndex + 1)
        }

        if (nextIndex !== null) {
          listRef?.current?.scrollIntoView({
            index: nextIndex,
            behavior: 'auto',
            done: () => {
              setCurrentItemIndex(nextIndex as number)
            },
          })
          e.preventDefault()
        }
      },
      [articles.length, currentItemIndex],
    )

    const gridKeyDownCallback = useCallback(
      (_e: KeyboardEvent) => {
        let nextIndex: number | null = null

        if (
          document.activeElement &&
          containerRef?.contains(document.activeElement)
        ) {
          const parentWithIndex =
            document.activeElement.closest('[data-index]')
          const focusedParentIndex =
            parentWithIndex?.getAttribute('data-index')

          if (focusedParentIndex) {
            nextIndex = Number(focusedParentIndex)
          }
        }

        if (nextIndex !== null) {
          gridRef?.current?.scrollToIndex(nextIndex)
        }
      },
      [containerRef],
    )

    useEffect(() => {
      window.addEventListener(
        'keydown',
        isListView ? listKeyDownCallback : gridKeyDownCallback,
      )

      return () => {
        window.removeEventListener('keydown', listKeyDownCallback)
        window.removeEventListener('keydown', gridKeyDownCallback)
      }
    }, [gridKeyDownCallback, isListView, listKeyDownCallback])

    if (isListView) {
      const listClassName = classNamesNew(styles.list, className)

      return (
        <div ref={setContainerRef} className={styles.listContainer}>
          {Header && <Header className={styles.header} />}
          <Virtuoso<Article>
            ref={listRef}
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
      <div ref={setContainerRef} className={styles.listContainer}>
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
              [styles.gridSkeletonsPadding]: articles.length !== 0,
            })}
          >
            {skeletons}
          </div>
        )}
      </div>
    )
  },
)

VirtualizedArticleList.displayName = 'VirtualizedArticleList'
