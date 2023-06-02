import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'
import { INITIAL_ARTICLE_VIEW } from '../../const/view'

export const getArticleInfiniteListView = createSelector(
  getArticleInfiniteListState,
  (state) => state?.view ?? INITIAL_ARTICLE_VIEW
)
