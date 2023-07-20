import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListError,
  getArticleInfiniteListError,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.error
)
