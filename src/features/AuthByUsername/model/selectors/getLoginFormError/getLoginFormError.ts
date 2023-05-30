import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const getLoginFormError = createSelector(
  getLoginFormState,
  (state) => state?.error
)
