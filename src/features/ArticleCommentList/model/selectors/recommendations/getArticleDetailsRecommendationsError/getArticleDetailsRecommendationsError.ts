import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsRecommendationsState } from '../getArticleDetailsRecommendationsState/getArticleDetailsRecommendationsState'

export const getArticleDetailsRecommendationsError =
  createSelector(
    getArticleDetailsRecommendationsState,
    (state) => state?.error
  )
