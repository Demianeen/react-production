import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentListState } from '../getArticleCommentListState/getArticleCommentListState'

export const getArticleCommentListError = createSelector(
  getArticleCommentListState,
  (state) => state?.error
)
