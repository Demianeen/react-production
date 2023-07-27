import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [useProfileForm, getProfileForm] = buildSelector(
  getProfileState,
  (profile) => profile?.form
)
