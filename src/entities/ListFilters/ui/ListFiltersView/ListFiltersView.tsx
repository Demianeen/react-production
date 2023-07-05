import { ToggleFeature } from '@/shared/lib/features'
import type { ListFiltersViewRedesignedProps } from './ListFiltersViewRedesigned/ListFiltersViewRedesigned'
import { ListFiltersViewRedesigned } from './ListFiltersViewRedesigned/ListFiltersViewRedesigned'
import { ListFiltersViewDeprecated } from './ListFiltersViewDeprecated/ListFiltersViewDeprecated'

export interface ListFiltersViewProps {
  className?: string
}

export const ListFiltersView = (
  props: ListFiltersViewProps & ListFiltersViewRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ListFiltersViewRedesigned {...props} />}
      off={<ListFiltersViewDeprecated {...props} />}
    />
  )
}
