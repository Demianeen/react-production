import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListHasMore = createSelector(
  getArticleInfiniteListState,
  (state) => state?.hasMore ?? true
)
