import React, { memo, useCallback, useMemo } from 'react'
import type { TabItem } from 'shared/ui/Tabs/Tabs'
import { Tabs } from 'shared/ui/Tabs/Tabs'
import { useSelector } from 'react-redux'
import { getSortedArticleListType } from 'features/SortedArticlesList/model/selectors/getSortedArticleListType/getSortedArticleListType'
import { ArticleType } from 'entities/Article'
import { useTranslation } from 'react-i18next'
import {
  articlesPageActions,
  fetchArticles,
} from 'pages/ArticlesPage'
import { sortedArticleListActions } from 'features/SortedArticlesList'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'

interface SortedArticleListTabsProps {
  className?: string
}

export const SortedArticleListTabs = memo(
  ({ className }: SortedArticleListTabsProps) => {
    const { t } = useTranslation('articles')

    const tab = useSelector(getSortedArticleListType)
    const dispatch = useAppDispatch()

    const tabs = useMemo<TabItem<ArticleType>[]>(
      () =>
        Object.values(ArticleType).map((value) => ({
          value,
          label: t(value),
        })),
      [t]
    )

    const onChangeType = useCallback(
      (type: ArticleType) => {
        dispatch(sortedArticleListActions.setType(type))
        dispatch(articlesPageActions.setPage(1))
        dispatch(fetchArticles({ replace: true }))
      },
      [dispatch]
    )

    return (
      <Tabs
        tabs={tabs}
        value={tab}
        onTabClick={onChangeType}
        className={className}
      />
    )
  }
)

SortedArticleListTabs.displayName = 'SortedArticleListTabs'
