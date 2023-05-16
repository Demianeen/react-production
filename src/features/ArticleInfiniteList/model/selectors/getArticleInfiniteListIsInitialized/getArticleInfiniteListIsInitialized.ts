import { createSelector } from '@reduxjs/toolkit'
import { getArticleInfiniteListState } from '../getArticleInfiniteListState/getArticleInfiniteListState'

export const getArticleInfiniteListIsInitialized =
  createSelector(
    getArticleInfiniteListState,
    (state) => state?._isInitialized ?? false
  )
