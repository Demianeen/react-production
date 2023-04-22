import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentListState } from 'features/ArticleCommentList/model/selectors/getArticleCommentListState/getArticleCommentListState'

export const getArticleCommentListError = createSelector(
  getArticleCommentListState,
  (state) => state?.error
)
