import { createSelector } from '@reduxjs/toolkit'
import type { StateSchema } from 'app/providers/StoreProvider'
import { getPageScrollPosition } from '../getPageScrollPosition/getPageScrollPosition'

export const getPageScrollPositionByPath = createSelector(
  getPageScrollPosition,
  (state: StateSchema, path: string) => path,
  (scrollPosition, path) => scrollPosition[path] ?? 0
)
