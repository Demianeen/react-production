import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const getArticleDetailsIsLoading = createSelector(
  getArticleDetailsState,
  (state) => state?.isLoading ?? false
)
