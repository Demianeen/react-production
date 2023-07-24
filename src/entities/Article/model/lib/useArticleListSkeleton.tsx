import type { View } from '@/entities/ListFilters'
import { useMemo } from 'react'
import type { ComputeListItemsLimitArgs } from './useComputeListItemsLimit'
import { useComputeListItemsLimit } from './useComputeListItemsLimit'
import { ArticleListItemSkeleton } from '../../ui/ArticleListItem/ArticleListItemSkeleton'

interface useArticleListSkeletonsArgs
  extends ComputeListItemsLimitArgs {
  view: View
  className?: string
}

export const useArticleListSkeletons = ({
  view,
  className,
  ...computeListLimitProps
}: useArticleListSkeletonsArgs) => {
  const skeletonAmountCalc = useComputeListItemsLimit({
    view,
    ...computeListLimitProps,
  })

  const articleSkeletons = useMemo(
    () => new Array(skeletonAmountCalc).fill(null),
    [skeletonAmountCalc]
  )

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
