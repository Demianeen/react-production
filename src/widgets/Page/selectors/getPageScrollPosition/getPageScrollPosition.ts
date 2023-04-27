import { createSelector } from '@reduxjs/toolkit'
import { getPageState } from '../getPageState/getPageState'

export const getPageScrollPosition = createSelector(
  getPageState,
  (state) => state?.scrollPosition ?? 0
)
