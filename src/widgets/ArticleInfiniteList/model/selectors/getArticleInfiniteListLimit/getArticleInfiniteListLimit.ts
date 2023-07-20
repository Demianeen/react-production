import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListLimit,
  getArticleInfiniteListLimit,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.limit ?? 0
)
