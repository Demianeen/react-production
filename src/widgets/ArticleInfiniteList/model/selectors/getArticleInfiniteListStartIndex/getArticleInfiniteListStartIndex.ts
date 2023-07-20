import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListStartIndex,
  getArticleInfiniteListStartIndex,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.startIndex ?? 0
)
