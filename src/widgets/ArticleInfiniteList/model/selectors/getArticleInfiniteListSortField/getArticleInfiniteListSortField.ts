import { SortField } from '@/entities/SortField'
import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListSortField,
  getArticleInfiniteListSortField,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.sortField ?? SortField.CREATED_AT
)
