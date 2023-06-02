import { memo } from 'react'
import { HStack, VStack } from '@/shared/ui/Stack'
import type { SortOrder } from '@/shared/const/sort'
import type { SortField } from '../../model/const/sortField'
import type { View } from '../../model/const/view'
import { ListFiltersSortField } from '../ListFiltersSortField/ListFiltersSortField'
import { ListFiltersView } from '../ListFiltersView/ListFiltersView'
import { ListFiltersOrder } from '../ListFiltersOrder/ListFiltersOrder'

interface SortedArticlesListProps {
  className?: string
  onChangeSortField?: (sortField: SortField) => void
  sortField?: SortField
  onChangeOrder?: (order: SortOrder) => void
  order?: SortOrder
  onChangeView?: (view: View) => void
  view?: View
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
      </VStack>
    )
  }
)

ListFilters.displayName = 'ListFilters'
