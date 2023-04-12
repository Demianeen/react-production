import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileValidationErrors = createSelector(
  getProfileState,
  (state) => state?.validationErrors
)
