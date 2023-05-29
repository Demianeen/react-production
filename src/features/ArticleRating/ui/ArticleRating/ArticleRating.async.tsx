import { lazy, Suspense } from 'react'
import { RatingCardSkeleton } from '@/entities/Rating'
import type { ArticleRatingProps } from './ArticleRating'

const ArticleRatingLazy = lazy(
  () => import('./ArticleRating')
)

export const ArticleRatingAsync = (
  props: ArticleRatingProps
) => (
  <Suspense fallback={<RatingCardSkeleton />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
)
