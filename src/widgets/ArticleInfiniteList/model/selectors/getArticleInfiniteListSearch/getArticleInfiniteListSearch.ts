import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListSearch,
  getArticleInfiniteListSearch,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.search ?? ''
)
