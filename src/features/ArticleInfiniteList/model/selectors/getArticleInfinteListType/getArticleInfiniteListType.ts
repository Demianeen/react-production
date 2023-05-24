import { createSelector } from '@reduxjs/toolkit'
import { ArticleType } from 'entities/Article'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListType = createSelector(
  getArticleInfiniteListState,
  (state) => state?.type ?? ArticleType.ALL
)
