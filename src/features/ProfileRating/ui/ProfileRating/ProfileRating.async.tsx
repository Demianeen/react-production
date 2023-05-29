import { lazy, Suspense } from 'react'
import { RatingCardSkeleton } from '@/entities/Rating'
import type { ProfileRatingProps } from './ProfileRating'

const ArticleRatingLazy = lazy(
  () => import('./ProfileRating')
)

export const ProfileRatingAsync = (
  props: ProfileRatingProps
) => (
  <Suspense fallback={<RatingCardSkeleton />}>
    <ArticleRatingLazy {...props} />
  </Suspense>
)
