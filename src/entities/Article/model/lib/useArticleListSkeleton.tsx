import type { View } from '@/entities/ListFilters'
import { useMemo } from 'react'
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton'

interface useArticleListSkeletonsArgs {
  view: View
  skeletonsAmount: number
  className?: string
}

export const useArticleListSkeletons = ({
  view,
  skeletonsAmount,
  className,
}: useArticleListSkeletonsArgs) => {
  const articleSkeletons = new Array(skeletonsAmount).fill(null)

  return useMemo(
    () =>
      articleSkeletons.map((_, index) => (
        <ArticleListItemSkeleton
          view={view}
          className={className}
          /* eslint-disable-next-line react/no-array-index-key */
          key={index}
        />
      )),
    [articleSkeletons, className, view]
  )
}
