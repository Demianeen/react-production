import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListPage,
  getArticleInfiniteListPage,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.page ?? 1
)
