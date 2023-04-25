import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageIsLoading = createSelector(
  getArticlesPageState,
  (state) => state?.isLoading ?? false
)
