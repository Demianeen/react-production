import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from 'features/AuthByUsername/modal/selectors/getLoginFormState/getLoginFormState'

export const getLoginFormPassword = createSelector(
  getLoginFormState,
  (state) => state?.password ?? ''
)
