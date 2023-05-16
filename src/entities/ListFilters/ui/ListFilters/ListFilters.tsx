import React, { memo } from 'react'
import { HStack, VStack } from 'shared/ui/Stack'
import type { SortOrder } from 'shared/types/sort'
import type { SortField } from '../../model/types/sortField'
import { ListFiltersSortField } from '../ListFiltersSortField/ListFiltersSortField'
import { ListFiltersView } from '../ListFiltersView/ListFiltersView'
import { ListFiltersSearch } from '../ListFiltersSearch/ListFiltersSearch'
import { ListFiltersOrder } from '../ListFiltersOrder/ListFiltersOrder'
import type { View } from '../../model/types/view'

interface SortedArticlesListProps {
  className?: string
  onChangeSortField?: (sortField: SortField) => void
  sortField?: SortField
  onChangeOrder?: (order: SortOrder) => void
  order?: SortOrder
  onChangeView?: (view: View) => void
  view?: View
  onSearch?: (search: string) => void
  onSearchDebounced?: (search: string) => void
  search?: string
  debounceDelay?: number
}

export const ListFilters = memo(
  ({
    className,
    onChangeOrder,
    order,
    onChangeSortField,
    sortField,
    onChangeView,
    view,
    onSearch,
    onSearchDebounced,
    search,
    debounceDelay,
  }: SortedArticlesListProps) => {
    return (
      <VStack gap={1.25} className={className} maxWidth>
        <HStack
          justify='between'
          align='center'
          gap={1}
          maxWidth
        >
          <HStack align='center' gap={1} wrap='nowrap'>
            {onChangeSortField && (
              <ListFiltersSortField
                onChangeSortField={onChangeSortField}
                sortField={sortField}
              />
            )}
            {onChangeOrder && (
              <ListFiltersOrder
                onChangeOrder={onChangeOrder}
                order={order}
              />
            )}
          </HStack>
          {onChangeView && (
            <ListFiltersView
              onChangeView={onChangeView}
              view={view}
            />
          )}
        </HStack>
        {(onSearch || onSearchDebounced) && (
          <ListFiltersSearch
            onSearch={onSearch}
            onSearchDebounced={onSearchDebounced}
            searchQuery={search}
            debounceDelay={debounceDelay}
          />
        )}
      </VStack>
    )
  }
)

ListFilters.displayName = 'ListFilters'
