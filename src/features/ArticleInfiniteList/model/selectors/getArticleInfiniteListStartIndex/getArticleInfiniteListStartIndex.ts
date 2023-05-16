import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListStartIndex =
  createSelector(
    getArticleInfiniteListState,
    (state) => state?.startIndex ?? 0
  )
