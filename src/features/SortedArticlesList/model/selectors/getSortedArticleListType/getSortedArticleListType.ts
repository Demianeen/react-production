import { createSelector } from '@reduxjs/toolkit'
import { ArticleType } from 'entities/Article'
import { getSortedArticleListState } from '../getSortedArticleListState/getSortedArticleListState'

export const getSortedArticleListType = createSelector(
  getSortedArticleListState,
  (state) => state?.type ?? ArticleType.ALL
)
