import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'entities/Profile/model/selectors/getProfileState/getProfileState'

export const getProfileData = createSelector(
  getProfileState,
  (profile) => profile?.data
)
