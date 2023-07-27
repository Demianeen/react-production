import { buildSelector } from '@/shared/lib/store'
import { getPageState } from '../getPageState/getPageState'

export const [usePageScrollPosition, getPageScrollPosition] =
  buildSelector(getPageState, (state) => state?.scrollPosition ?? 0)
