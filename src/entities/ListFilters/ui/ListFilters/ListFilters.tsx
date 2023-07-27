import { memo } from 'react'
import { Flex, HStack, VStack } from '@/shared/ui/redesigned/Stack'
import type { SortOrder } from '@/shared/const/sort'
import { useViewport } from '@/shared/lib/hooks/useViewport/useViewport'
import type { SortField } from '../../model/const/sortField'
import type { View } from '../../model/const/view'
import { ListFiltersSortField } from '../ListFiltersSortField/ListFiltersSortField'
import { ListFiltersView } from '../ListFiltersView/ListFiltersView'
import { ListFiltersOrder } from '../ListFiltersOrder/ListFiltersOrder'

interface ListFiltersProps {
  className?: string
  onChangeSortField?: (sortField: SortField) => void
  sortField?: SortField
  onChangeOrder?: (order: SortOrder) => void
  order?: SortOrder
  onChangeView?: (view: View) => void
  view?: View
}

/**
 * @deprecated
 * Use separate list filters components
 */
export const ListFilters = memo(
  ({
    className,
    onChangeOrder,
    order,
    onChangeSortField,
    sortField,
    onChangeView,
    view,
  }: ListFiltersProps) => {
    const { isMobile } = useViewport()
    return (
      <VStack gap={1.25} className={className} maxWidth>
        <HStack justify='between' align='center' gap={1} maxWidth>
          <Flex
            direction={isMobile ? 'column' : 'row'}
            align={isMobile ? undefined : 'center'}
            gap={1}
            wrap='nowrap'
          >
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
          </Flex>
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
