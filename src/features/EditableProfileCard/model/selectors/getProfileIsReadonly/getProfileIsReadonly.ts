import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from '../getProfileState/getProfileState'

export const getProfileIsReadonly = createSelector(
  getProfileState,
  (state) => state?.isReadonly ?? true
)
