import { SortField } from '@/entities/ListFilters'
import { buildSelector } from '@/shared/lib/store'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const [
  useArticleInfiniteListSortField,
  getArticleInfiniteListSortField,
] = buildSelector(
  getArticleInfiniteListState,
  (state) => state?.sortField ?? SortField.CREATED_AT
)
