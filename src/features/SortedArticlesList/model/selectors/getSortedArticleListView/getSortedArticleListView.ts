import { createSelector } from '@reduxjs/toolkit'
import { INITIAL_ARTICLE_VIEW } from '../../const/view'
import { getSortedArticleListState } from '../getSortedArticleListState/getSortedArticleListState'

export const getSortedArticleListView = createSelector(
  getSortedArticleListState,
  (state) => state?.view ?? INITIAL_ARTICLE_VIEW
)
