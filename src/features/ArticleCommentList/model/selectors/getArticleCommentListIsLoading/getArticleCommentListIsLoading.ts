import { createSelector } from '@reduxjs/toolkit'
import { getArticleCommentListState } from '../getArticleCommentListState/getArticleCommentListState'

export const getArticleCommentListIsLoading =
  createSelector(
    getArticleCommentListState,
    (state) => state?.isLoading ?? false
  )
