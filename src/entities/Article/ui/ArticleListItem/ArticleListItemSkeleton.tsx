import { ToggleFeature } from '@/shared/lib/features'
import type { ArticleListItemSkeletonRedesignedProps } from './ArticleListItemSkeletonRedesigned/ArticleListItemSkeletonRedesigned'
import { ArticleListItemSkeletonRedesigned } from './ArticleListItemSkeletonRedesigned/ArticleListItemSkeletonRedesigned'
import { ArticleListItemSkeletonDeprecated } from './ArticleListItemSkeletonDeprecated/ArticleListItemSkeletonDeprecated'

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
