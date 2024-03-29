import { memo, useMemo } from 'react'
import type { FlexDirection } from '@/shared/ui/redesigned/Stack'
import { Flex, VStack } from '@/shared/ui/redesigned/Stack'
import { SelectOrder, type SortOrder } from '@/entities/Order'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleType } from '@/entities/Article'
import type { TabItem } from '@/shared/ui/deprecated/Tabs'
import { Tabs } from '@/shared/ui/redesigned/Tabs'
import { useTranslation } from 'react-i18next'
import { Search } from '@/shared/ui/redesigned/Search'
import { classNamesNew } from '@/shared/lib/classNames/classNamesNew'
import { SelectSortField, type SortField } from '@/entities/SortField'
import styles from './ArticleListFilters.module.scss'

export interface ArticleListFiltersRedesignedProps {
  className?: string
  onChangeSortField: (sortField: SortField) => void
  sortField: SortField
  onChangeOrder: (order: SortOrder) => void
  order: SortOrder
  onSearch: (query: string) => void
  onSearchDebounced: (query: string) => void
  search: string
  onChangeTab: (type: ArticleType) => void
  tab: ArticleType
  /**
   * @default 'column'
   */
  direction?: FlexDirection
}

export const ArticleListFiltersRedesigned = memo(
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
    direction = 'column',
  }: ArticleListFiltersRedesignedProps) => {
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
        className={classNamesNew(
          {
            [styles.column]: direction === 'column',
            [styles.row]: direction === 'row',
          },
          className
        )}
        maxWidth
        padding={1.5}
      >
        <Search
          onSearch={onSearch}
          onSearchDebounced={onSearchDebounced}
          searchQuery={search}
        />
        <Tabs
          direction={direction}
          tabs={tabs}
          value={tab}
          onTabClick={onChangeTab}
          className={className}
        />
        <Flex
          direction={direction}
          gap={1.25}
          className={styles.sortWrapper}
          wrap='wrap'
        >
          <SelectSortField
            onChangeSortField={onChangeSortField}
            sortField={sortField}
          />
          <SelectOrder onChangeOrder={onChangeOrder} order={order} />
        </Flex>
      </VStack>
    )
  }
)

ArticleListFiltersRedesigned.displayName = 'ArticleListFilters'
