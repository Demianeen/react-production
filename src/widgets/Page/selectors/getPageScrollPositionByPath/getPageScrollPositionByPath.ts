import type { StateSchema } from '@/app/providers/StoreProvider'
import { buildSelector } from '@/shared/lib/store'
import { getPageScrollPosition } from '../getPageScrollPosition/getPageScrollPosition'

export const [
  usePageScrollPositionByPath,
  getPageScrollPositionByPath,
] = buildSelector(
  getPageScrollPosition,
  (_: StateSchema, path: string) => path,
  (scrollPosition, path) => scrollPosition[path] ?? 0
)
