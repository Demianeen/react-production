import React, { memo } from 'react'
import { SelectArticleListFilters } from '../SelectArticleListFilters/SelectArticleListFilters'
import { SelectArticleListView } from '../SelectArticleListView/SelectArticleListView'
import { ArticleListSearch } from '../ArticleListSearch/ArticleListSearch'
import styles from './SortedArticleListFilters.module.scss'
import { SortedArticleListTabs } from '../SortedArticleListTabs/SortedArticleListTabs'

export const SortedArticleListFilters = memo(() => {
  return (
    <div className={styles.articlePageFilters}>
      <div className={styles.sortWrapper}>
        <SelectArticleListFilters />
        <SelectArticleListView />
      </div>
      <ArticleListSearch className={styles.search} />
      <SortedArticleListTabs className={styles.tabs} />
    </div>
  )
})

SortedArticleListFilters.displayName =
  'SortedArticleListFilters'
