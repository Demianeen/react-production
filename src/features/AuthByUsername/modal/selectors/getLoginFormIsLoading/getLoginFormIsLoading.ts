import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from 'features/AuthByUsername/modal/selectors/getLoginFormState/getLoginFormState'

export const getLoginFormIsLoading = createSelector(
  getLoginFormState,
  (state) => state?.isLoading ?? false
)
