import { createSelector } from '@reduxjs/toolkit'
import { getProfileState } from 'features/EditableProfileCard/model/selectors/getProfileState/getProfileState'

export const getProfileIsReadonly = createSelector(
  getProfileState,
  (state) => state?.isReadonly
)
