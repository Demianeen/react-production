import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileForm = createSelector(
  getProfileState,
  (profile) => profile?.form
)
