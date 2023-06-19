import type { EntityState } from '@reduxjs/toolkit'
import type { Article, ArticleType } from '@/entities/Article'
import type { SortOrder } from '@/shared/const/sort'
import type { SortField, View } from '@/entities/ListFilters'

export interface ArticleInfiniteListSchema
  extends EntityState<Article> {
  isLoading: boolean
  error?: string

  // pagination
  page: number
  limit: number
  hasMore: boolean

  // preserve scroll position
  startIndex: number

  // filters
  order: SortOrder
  sortField: SortField
  search: string
  view: View
  type: ArticleType

  // prevent multiple slice initializations
  _isInitialized: boolean
}
