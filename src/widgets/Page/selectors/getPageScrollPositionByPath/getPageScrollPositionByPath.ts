import { createSelector } from '@reduxjs/toolkit'
import { getPageScrollPosition } from 'widgets/Page/selectors/getPageScrollPosition/getPageScrollPosition'
import type { StateSchema } from 'app/providers/StoreProvider'

export const getPageScrollPositionByPath = createSelector(
  getPageScrollPosition,
  (state: StateSchema, path: string) => path,
  (scrollPosition, path) => scrollPosition[path] ?? 0
)
