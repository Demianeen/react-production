import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'entities/Profile/model/selectors/getProfileState/getProfileState'

export const getProfileIsLoading = createSelector(
  getProfileState,
  (state) => state?.isLoading
)
