import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from 'features/AuthByUsername/modal/selectors/getLoginFormState/getLoginFormState'

export const getLoginFormError = createSelector(
  getLoginFormState,
  (state) => state?.error
)
