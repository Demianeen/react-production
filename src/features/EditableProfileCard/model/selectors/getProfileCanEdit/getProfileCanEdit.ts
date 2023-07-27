import { getUserAuthData } from '@/entities/User'
import { buildSelector } from '@/shared/lib/store'
import { getProfileData } from '../getProfileData/getProfileData'

export const [useProfileCanEdit, getProfileCanEdit] = buildSelector(
  getProfileData,
  getUserAuthData,
  (profileData, userData) => {
    // because undefined === undefined is true
    if (!profileData || !userData) {
      return false
    }
    return profileData.id === userData.id ?? false
  }
)
