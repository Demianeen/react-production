import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListPage = createSelector(
  getArticleInfiniteListState,
  (state) => state?.page ?? 1
)
