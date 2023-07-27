import { buildSelector } from '@/shared/lib/store'
import { getProfileState } from '../getProfileState/getProfileState'

export const [useProfileData, getProfileData] = buildSelector(
  getProfileState,
  (profile) => profile?.data
)
