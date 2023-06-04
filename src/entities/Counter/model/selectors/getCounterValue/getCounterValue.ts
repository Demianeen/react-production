import { buildSelector } from '@/shared/ui/store'

export const [useCounterValue, getCounterValue] =
  buildSelector((state) => state.counter.value)
