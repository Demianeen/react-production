import { createSelector } from '@reduxjs/toolkit'
import { getSortedArticleListState } from '../getSortedArticleListState/getSortedArticleListState'

export const getSortedArticleListSortField = createSelector(
  getSortedArticleListState,
  (state) => state?.sort
)
