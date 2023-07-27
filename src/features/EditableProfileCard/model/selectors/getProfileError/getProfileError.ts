import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [useProfileError, getProfileError] = buildSelector(
  getProfileState,
  (state) => state?.error
)
