import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsRecommendationsState } from '../getArticleDetailsRecommendationsState/getArticleDetailsRecommendationsState'

export const getArticleDetailsRecommendationsIsLoading =
  createSelector(
    getArticleDetailsRecommendationsState,
    (state) => state?.isLoading ?? false
  )
