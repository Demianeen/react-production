import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from '../getProfileState/getProfileState'

export const getProfileForm = createSelector(
  getProfileState,
  (profile) => profile?.form
)
