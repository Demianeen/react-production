import { ToggleFeature } from '@/shared/lib/features'
import type { ListFiltersDeprecatedProps } from './ArticleListFiltersDepreceted/ArticleListFilters'
import { ArticleListFiltersDeprecated } from './ArticleListFiltersDepreceted/ArticleListFilters'
import type { ArticleListFiltersRedesignedProps } from './ArticleListFiltersRedesigned/ArticleListFilters'
import { ArticleListFiltersRedesigned } from './ArticleListFiltersRedesigned/ArticleListFilters'

export interface ArticleListFiltersProps {
  className?: string
}

export const ArticleListFilters = ({
  ...props
}: ArticleListFiltersProps &
  ArticleListFiltersRedesignedProps &
  Partial<ListFiltersDeprecatedProps>) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleListFiltersRedesigned {...props} />}
      off={<ArticleListFiltersDeprecated {...props} />}
    />
  )
}
