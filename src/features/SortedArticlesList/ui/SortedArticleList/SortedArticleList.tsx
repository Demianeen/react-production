import type {
  HTMLAttributeAnchorTarget,
  RefObject,
} from 'react'
import React, { memo } from 'react'
import type {
  Article,
  OnOpenArticle,
} from 'entities/Article'
import { VirtualizedArticleList } from 'entities/Article'
import { useSelector } from 'react-redux'
import { getSortedArticleListView } from 'features/SortedArticlesList/model/selectors/getSortedArticleListView/getSortedArticleListView'
import { classNames } from 'shared/lib/classNames/classNames'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import {
  sortedArticleListActions,
  sortedArticleListReducer,
} from 'features/SortedArticlesList/model/slice/sortedArticleListSlice'
import { SortedArticleListFilters } from 'features/SortedArticlesList/ui/SortedArticleListFilters/SortedArticleListFilters'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { View } from 'entities/View'
import styles from './SortedArticleList.module.scss'

interface SortedArticlesListProps {
  articles: Article[]
  onLoadNextPart: () => void
  isLoading: boolean
  className?: string
  limit?: number
  scrollParent?: RefObject<HTMLElement>
  target?: HTMLAttributeAnchorTarget
  onOpenArticle?: OnOpenArticle
  startIndex?: number
}

const reducers: ReducersList = {
  sortedArticleList: sortedArticleListReducer,
}

export const SortedArticleList = memo(
  ({
    articles,
    isLoading,
    className,
    limit,
    onLoadNextPart,
    scrollParent,
    target,
    onOpenArticle,
    startIndex,
  }: SortedArticlesListProps) => {
    useDynamicModuleLoader(reducers, {
      removeOnUnmount: false,
    })

    const dispatch = useAppDispatch()

    const view = useSelector(getSortedArticleListView)

    useInitialEffect(() => {
      dispatch(sortedArticleListActions.initState())
    })

    return (
      <div
        className={classNames(
          styles.sortedArticlesList,
          {},
          [className]
        )}
      >
        <VirtualizedArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={styles.articleList}
          limit={limit ?? view === View.GRID ? 8 : 1}
          onLoadNextPart={onLoadNextPart}
          scrollParentRef={scrollParent}
          Header={SortedArticleListFilters}
          startIndex={startIndex}
          target={target}
          onOpenArticle={onOpenArticle}
        />
      </div>
    )
  }
)

SortedArticleList.displayName = 'SortedArticleList'
