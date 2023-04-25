import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageError = createSelector(
  getArticlesPageState,
  (state) => state?.error
)
