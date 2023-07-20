import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListHasMore,
  getArticleInfiniteListHasMore,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.hasMore ?? true
)
