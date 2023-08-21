import { SortOrder } from '@/entities/Order'
import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListOrder,
  getArticleInfiniteListOrder,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.order ?? SortOrder.ASC
)
