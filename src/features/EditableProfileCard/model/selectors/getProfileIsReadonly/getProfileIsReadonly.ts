import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [useProfileIsReadonly, getProfileIsReadonly] =
  buildSelector(getProfileState, (state) => state?.isReadonly ?? true)
