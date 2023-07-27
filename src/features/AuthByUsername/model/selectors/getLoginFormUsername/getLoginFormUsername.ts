import { buildSelector } from '@/shared/lib/store'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const [useLoginFormUsername, getLoginFormUsername] =
  buildSelector(getLoginFormState, (state) => state?.username ?? '')
