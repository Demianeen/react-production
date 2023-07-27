import { buildSelector } from '@/shared/lib/store'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const [useLoginFormIsLoading, getLoginFormIsLoading] =
  buildSelector(
    getLoginFormState,
    (state) => state?.isLoading ?? false
  )
