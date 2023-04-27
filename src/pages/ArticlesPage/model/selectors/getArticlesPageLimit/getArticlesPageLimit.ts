import { createSelector } from '@reduxjs/toolkit'
import { getArticlesPageState } from '../getArticlesPageState/getArticlesPageState'

export const getArticlesPageLimit = createSelector(
  getArticlesPageState,
  (state) => state?.limit ?? 12
)
