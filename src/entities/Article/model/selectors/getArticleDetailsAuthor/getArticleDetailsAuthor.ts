import { createSelector } from '@reduxjs/toolkit'
import { getArticleDetailsData } from '../getArticleDetailsData/getArticleDetailsData'

export const getArticleDetailsAuthor = createSelector(
  getArticleDetailsData,
  (state) => state?.user
)
