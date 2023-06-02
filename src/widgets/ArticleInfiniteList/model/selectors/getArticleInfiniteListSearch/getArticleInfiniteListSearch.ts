import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListSearch = createSelector(
  getArticleInfiniteListState,
  (state) => state?.search ?? ''
)
