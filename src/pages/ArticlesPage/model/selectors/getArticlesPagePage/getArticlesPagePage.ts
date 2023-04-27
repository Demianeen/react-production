import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPagePage = createSelector(
  getArticlesPageState,
  (state) => state?.page ?? 1
)
