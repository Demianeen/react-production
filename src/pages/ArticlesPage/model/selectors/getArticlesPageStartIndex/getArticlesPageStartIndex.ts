import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageStartIndex = createSelector(
  getArticlesPageState,
  (state) => state?.startIndex ?? 0
)
