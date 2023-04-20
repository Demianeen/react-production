import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentsState } from '../getArticleCommentsState/getArticleCommentsState'

export const getArticleCommentsIsLoading = createSelector(
  getArticleCommentsState,
  (state) => state?.isLoading ?? false
)
