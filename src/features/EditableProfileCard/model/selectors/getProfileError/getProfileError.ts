import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileError = createSelector(
  getProfileState,
  (state) => state?.error
)
