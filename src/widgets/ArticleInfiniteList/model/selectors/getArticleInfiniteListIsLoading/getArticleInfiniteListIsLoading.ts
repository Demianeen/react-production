import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListIsLoading = createSelector(
  getArticleInfiniteListState,
  (state) => state?.isLoading ?? false
)
