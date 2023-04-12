import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileIsLoading = createSelector(
  getProfileState,
  (state) => state?.isLoading
)
