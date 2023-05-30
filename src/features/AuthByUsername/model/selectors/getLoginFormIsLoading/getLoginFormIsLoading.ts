import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from '../getLoginFormState/getLoginFormState'

export const getLoginFormIsLoading = createSelector(
  getLoginFormState,
  (state) => state?.isLoading ?? false
)
