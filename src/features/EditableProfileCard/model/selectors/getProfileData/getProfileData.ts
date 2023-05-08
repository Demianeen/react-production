import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from '../getProfileState/getProfileState'

export const getProfileData = createSelector(
  getProfileState,
  (profile) => profile?.data
)
