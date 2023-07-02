import { buildSelector } from '@/shared/lib/store'
import { getCounter } from '../getCounter/getCounter'

export const [useCounterValue, getCounterValue] = buildSelector(
  getCounter,
  (counter) => counter.value
)
