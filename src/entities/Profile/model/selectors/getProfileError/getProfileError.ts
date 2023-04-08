import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'entities/Profile/model/selectors/getProfileState/getProfileState'

export const getProfileError = createSelector(
  getProfileState,
  (state) => state?.error
)
