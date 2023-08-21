import { memo, useMemo } from 'react'
import { Flex, HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import { SelectOrder, type SortOrder } from '@/entities/Order'
import { SelectSortField, type SortField } from '@/entities/SortField'
import { SelectView, type View } from '@/entities/View'
import { ArticleType } from '@/entities/Article'
import type { TabItem } from '@/shared/ui/deprecated/Tabs'
import { Tabs } from '@/shared/ui/deprecated/Tabs'
import { useTranslation } from 'react-i18next'
import { Search } from '@/shared/ui/deprecated/Search'

export interface ListFiltersDeprecatedProps {
  className?: string
  onChangeSortField: (sortField: SortField) => void
  sortField: SortField
  onChangeOrder: (order: SortOrder) => void
  order: SortOrder
  onChangeView?: (view: View) => void
  search: string
  onSearch: (query: string) => void
  onSearchDebounced: (query: string) => void
  view?: View
  onChangeTab: (type: ArticleType) => void
  tab: ArticleType
}

export const ArticleListFiltersDeprecated = memo(
  ({
    className,
    onChangeOrder,
    order,
    onChangeSortField,
    sortField,
    onChangeView,
    view,
    onChangeTab,
    tab,
    onSearch,
    onSearchDebounced,
    search,
  }: ListFiltersDeprecatedProps) => {
    const { t } = useTranslation('articles')

    const { isMobile } = useViewport()

    const tabs = useMemo<TabItem<ArticleType>[]>(
      () =>
        Object.values(ArticleType).map((value) => ({
          value,
          label: t(value),
        })),
      [t]
    )

    return (
      <VStack gap={1.25} className={className} maxWidth>
        <HStack justify='between' align='center' gap={1} maxWidth>
          <Flex
            direction={isMobile ? 'column' : 'row'}
            align={isMobile ? undefined : 'center'}
            gap={1}
            wrap='nowrap'
          >
            <SelectSortField
              onChangeSortField={onChangeSortField}
              sortField={sortField}
            />
            <SelectOrder
              onChangeOrder={onChangeOrder}
              order={order}
            />
          </Flex>
          {onChangeView && (
            <SelectView onChangeView={onChangeView} view={view} />
          )}
        </HStack>
        <Search
          onSearch={onSearch}
          onSearchDebounced={onSearchDebounced}
          searchQuery={search}
        />
        <Tabs
          tabs={tabs}
          value={tab}
          onTabClick={onChangeTab}
          className={className}
        />
      </VStack>
    )
  }
)

ArticleListFiltersDeprecated.displayName = 'ArticleListFilters'
