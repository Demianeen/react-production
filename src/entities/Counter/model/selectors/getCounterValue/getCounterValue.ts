import { buildSelector } from '@/shared/ui/deprecated/store'
import { getCounter } from '../getCounter/getCounter'

export const [useCounterValue, getCounterValue] = buildSelector(
  getCounter,
  (counter) => counter.value
)
