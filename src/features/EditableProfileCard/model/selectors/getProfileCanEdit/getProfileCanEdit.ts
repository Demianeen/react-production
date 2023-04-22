import { createSelector } from '@reduxjs/toolkit'
import { getUserAuthData } from 'entities/User'
import { getProfileData } from '../getProfileData/getProfileData'

export const getProfileCanEdit = createSelector(
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
