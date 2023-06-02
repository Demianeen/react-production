import { createSelector } from '@reduxjs/toolkit'
import { SortField } from '@/entities/ListFilters'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListSortField =
  createSelector(
    getArticleInfiniteListState,
    (state) => state?.sortField ?? SortField.CREATED_AT
  )
