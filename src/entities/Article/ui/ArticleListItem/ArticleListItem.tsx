import { ToggleFeature } from '@/shared/lib/features'
import type { ArticleListItemRedesignedProps } from './ArticleListItemRedesigned/ArticleListItemRedesigned'
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned'
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated'

export interface ArticleListItemProps {
  className?: string
}

export const ArticleListItem = (
  props: ArticleListItemProps & ArticleListItemRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  )
}
