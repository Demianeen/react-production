import React, { memo } from 'react'
import { HStack, VStack } from 'shared/ui/Stack'
import { SelectArticleListFilters } from '../SelectArticleListFilters/SelectArticleListFilters'
import { SelectArticleListView } from '../SelectArticleListView/SelectArticleListView'
import { ArticleListSearch } from '../ArticleListSearch/ArticleListSearch'
import styles from './SortedArticleListFilters.module.scss'
import { SortedArticleListTabs } from '../SortedArticleListTabs/SortedArticleListTabs'

export const SortedArticleListFilters = memo(() => {
  return (
    <VStack
      gap={1.25}
      className={styles.articlePageFilters}
    >
      <HStack
        justify='between'
        align='center'
        gap={1}
        maxWidth
      >
        <SelectArticleListFilters />
        <SelectArticleListView />
      </HStack>
      <ArticleListSearch />
      <SortedArticleListTabs />
    </VStack>
  )
})

SortedArticleListFilters.displayName =
  'SortedArticleListFilters'
