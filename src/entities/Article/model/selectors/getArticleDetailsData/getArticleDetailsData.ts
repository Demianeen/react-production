import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsState } from '../getArticleDetailsState/getArticleDetailsState'

export const getArticleDetailsData = createSelector(
  getArticleDetailsState,
  (state) => state?.data
)
