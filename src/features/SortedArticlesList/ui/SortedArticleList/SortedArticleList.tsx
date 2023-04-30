import React, { memo } from 'react'
import type { Article } from 'entities/Article'
import { ArticleList } from 'entities/Article'
import { useSelector } from 'react-redux'
import { getSortedArticleListView } from 'features/SortedArticlesList/model/selectors/getSortedArticleListView/getSortedArticleListView'
import { classNames } from 'shared/lib/classNames/classNames'
import { SortedArticleListFilters } from 'features/SortedArticlesList/ui/SortedArticleListFilters/SortedArticleListFilters'
import type { ReducersList } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader'
import { sortedArticleListReducer } from 'features/SortedArticlesList/model/slice/sortedArticleListSlice'
import styles from './SortedArticleList.module.scss'

interface SortedArticlesListProps {
  articles: Article[]
  isLoading: boolean
  className?: string
}

const reducers: ReducersList = {
  sortedArticleList: sortedArticleListReducer,
}

export const SortedArticleList = memo(
  ({
    articles,
    isLoading,
    className,
  }: SortedArticlesListProps) => {
    useDynamicModuleLoader(reducers, {
      removeOnUnmount: false,
    })
    const view = useSelector(getSortedArticleListView)

    return (
      <div
        className={classNames(
          styles.sortedArticlesList,
          {},
          [className]
        )}
      >
        <SortedArticleListFilters />
        <ArticleList
          articles={articles}
          isLoading={isLoading}
          view={view}
          className={styles.articleList}
        />
      </div>
    )
  }
)

SortedArticleList.displayName = 'SortedArticleList'
