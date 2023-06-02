import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListLimit = createSelector(
  getArticleInfiniteListState,
  (state) => state?.limit ?? 12
)
