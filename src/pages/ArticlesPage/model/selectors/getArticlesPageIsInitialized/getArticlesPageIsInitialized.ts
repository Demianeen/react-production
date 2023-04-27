import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageIsInitialized = createSelector(
  getArticlesPageState,
  (state) => state?._isInitialized ?? false
)
