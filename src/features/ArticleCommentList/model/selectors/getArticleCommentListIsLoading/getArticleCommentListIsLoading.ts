import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentListState } from 'features/ArticleCommentList/model/selectors/getArticleCommentListState/getArticleCommentListState'

export const getArticleCommentListIsLoading =
  createSelector(
    getArticleCommentListState,
    (state) => state?.isLoading ?? false
  )
