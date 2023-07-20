import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListIsLoading,
  getArticleInfiniteListIsLoading,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.isLoading ?? false
)
