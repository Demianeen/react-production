import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsState } from './getArticleDetailsState/getArticleDetailsState'

export const getArticleDetailsData = createSelector(
  getArticleDetailsState,
  (state) => state?.data
)

export const getArticleDetailsIsLoading = createSelector(
  getArticleDetailsState,
  (state) => state?.isLoading ?? false
)

export const getArticleDetailsError = createSelector(
  getArticleDetailsState,
  (state) => state?.error
)
