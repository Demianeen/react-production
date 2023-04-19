import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const getArticleDetailsError = createSelector(
  getArticleDetailsState,
  (state) => state?.error
)
