import React, { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { SelectArticleListFilters } from '../SelectArticleListFilters/SelectArticleListFilters'
import { SelectArticleListView } from '../SelectArticleListView/SelectArticleListView'
import { ArticleListSearch } from '../ArticleListSearch/ArticleListSearch'
import styles from './SortedArticleListFilters.module.scss'
import { SortedArticleListTabs } from '../SortedArticleListTabs/SortedArticleListTabs'

interface ArticlePageFiltersProps {
  className?: string
}

export const SortedArticleListFilters = memo(
  ({ className }: ArticlePageFiltersProps) => {
    return (
      <div
        className={classNames(
          styles.articlePageFilters,
          {},
          [className]
        )}
      >
        <div className={styles.sortWrapper}>
          <SelectArticleListFilters />
          <SelectArticleListView />
        </div>
        <ArticleListSearch className={styles.search} />
        <SortedArticleListTabs className={styles.tabs} />
      </div>
    )
  }
)

SortedArticleListFilters.displayName =
  'SortedArticleListFilters'
