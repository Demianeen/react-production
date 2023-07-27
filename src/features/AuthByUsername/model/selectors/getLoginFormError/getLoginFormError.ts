import { buildSelector } from '@/shared/lib/store'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const [useLoginFormError, getLoginFormError] = buildSelector(
  getLoginFormState,
  (state) => state?.error
)
