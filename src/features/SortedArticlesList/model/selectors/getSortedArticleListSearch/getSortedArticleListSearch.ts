import { createSelector } from '@reduxjs/toolkit'
import { getSortedArticleListState } from '../getSortedArticleListState/getSortedArticleListState'

export const getSortedArticleListSearch = createSelector(
  getSortedArticleListState,
  (state) => state?.search ?? ''
)
