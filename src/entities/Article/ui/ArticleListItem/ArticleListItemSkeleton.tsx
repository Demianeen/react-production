import { ToggleFeature } from '@/shared/lib/features'
import type { ArticleListItemSkeletonRedesignedProps } from './ArticleListItemRedesigned/ArticleListItemSkeletonRedesigned'
import { ArticleListItemSkeletonDeprecated } from './ArticleListItemDeprecated/ArticleListItemSkeletonDeprecated'
import { ArticleListItemSkeletonRedesigned } from './ArticleListItemRedesigned/ArticleListItemSkeletonRedesigned'

export interface ArticleListItemSkeletonProps {
  className?: string
}

export const ArticleListItemSkeleton = (
  props: ArticleListItemSkeletonProps &
    ArticleListItemSkeletonRedesignedProps
) => {
  return (
    <ToggleFeature
      name='isAppRedesigned'
      on={<ArticleListItemSkeletonRedesigned {...props} />}
      off={<ArticleListItemSkeletonDeprecated {...props} />}
    />
  )
}
