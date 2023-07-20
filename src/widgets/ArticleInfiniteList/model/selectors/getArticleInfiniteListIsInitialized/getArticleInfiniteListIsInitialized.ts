import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListIsInitialized,
  getArticleInfiniteListIsInitialized,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?._isInitialized ?? false
)
