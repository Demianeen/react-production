import { createSelector } from '@reduxjs/toolkit'
import { SortOrder } from 'shared/types/sort'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListOrder = createSelector(
  getArticleInfiniteListState,
  (state) => state?.order ?? SortOrder.ASC
)
