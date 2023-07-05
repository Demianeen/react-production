import { memo, useMemo } from 'react'
import { VStack } from '@/shared/ui/redesigned/Stack'
import type { SortOrder } from '@/shared/const/sort'
import { Card } from '@/shared/ui/redesigned/Card'
import { Search } from '@/shared/ui/deprecated/Search'
import type { SortField } from '@/entities/ListFilters'
import {
  ListFiltersOrder,
  ListFiltersSortField,
} from '@/entities/ListFilters'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleType } from '@/entities/Article'
import type { TabItem } from '@/shared/ui/deprecated/Tabs'
import { Tabs } from '@/shared/ui/redesigned/Tabs'
import { useTranslation } from 'react-i18next'
import styles from './ArticleListFilters.module.scss'

interface ArticleListFiltersProps {
  className?: string
  onChangeSortField: (sortField: SortField) => void
  sortField: SortField
  onChangeOrder: (order: SortOrder) => void
  order: SortOrder
  onSearch: (query: string) => void
  onSearchDebounced: (query: string) => void
  search: string
  tab: ArticleType
  onChangeTab: (type: ArticleType) => void
}

export const ArticleListFilters = memo(
  ({
    className,
    onChangeOrder,
    order,
    onChangeSortField,
    sortField,
    onSearch,
    onSearchDebounced,
    search,
    tab,
    onChangeTab,
  }: ArticleListFiltersProps) => {
    const { t } = useTranslation('articles')

    const tabs = useMemo<TabItem<ArticleType>[]>(
      () =>
        Object.values(ArticleType).map((value) => ({
          value,
          label: t(value),
        })),
      [t]
    )

    return (
      <VStack
        as={Card}
        gap={2}
        className={classNames(styles.articleListFilters, {}, [
          className,
        ])}
        maxWidth
        padding={1.5}
      >
        <Search
          onSearch={onSearch}
          onSearchDebounced={onSearchDebounced}
          searchQuery={search}
        />
        <Tabs
          direction='column'
          tabs={tabs}
          value={tab}
          onTabClick={onChangeTab}
          className={className}
        />
        <VStack gap={1.25}>
          <ListFiltersSortField
            onChangeSortField={onChangeSortField}
            sortField={sortField}
          />
          <ListFiltersOrder
            onChangeOrder={onChangeOrder}
            order={order}
          />
        </VStack>
      </VStack>
    )
  }
)

ArticleListFilters.displayName = 'ListFilters'
