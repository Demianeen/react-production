import { createSelector } from '@reduxjs/toolkit'
import { getSortedArticleListState } from '../getSortedArticleListState/getSortedArticleListState'

export const getSortedArticleListOrder = createSelector(
  getSortedArticleListState,
  (state) => state?.order
)
