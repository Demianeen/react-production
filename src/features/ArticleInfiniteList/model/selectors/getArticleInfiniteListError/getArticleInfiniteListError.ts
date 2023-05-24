import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListError = createSelector(
  getArticleInfiniteListState,
  (state) => state?.error
)
