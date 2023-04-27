import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageHasMore = createSelector(
  getArticlesPageState,
  (state) => state?.hasMore ?? true
)
