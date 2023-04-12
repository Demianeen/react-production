import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileData = createSelector(
  getProfileState,
  (profile) => profile?.data
)
