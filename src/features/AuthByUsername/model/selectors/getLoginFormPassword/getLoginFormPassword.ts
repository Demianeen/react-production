import { buildSelector } from '@/shared/lib/store'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const [useLoginFormPassword, getLoginFormPassword] =
  buildSelector(getLoginFormState, (state) => state?.password ?? '')
