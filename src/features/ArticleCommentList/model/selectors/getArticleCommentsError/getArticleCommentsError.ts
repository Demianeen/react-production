import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentsState } from '../getArticleCommentsState/getArticleCommentsState'

export const getArticleCommentsError = createSelector(
  getArticleCommentsState,
  (state) => state?.error
)
