import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from '../getProfileState/getProfileState'

export const getProfileValidationErrors = createSelector(
  getProfileState,
  (state) => state?.validationErrors
)
