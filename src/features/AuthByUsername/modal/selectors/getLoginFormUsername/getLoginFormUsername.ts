import { createSelector } from '@reduxjs/toolkit'
import { getLoginFormState } from 'features/AuthByUsername/modal/selectors/getLoginFormState/getLoginFormState'

export const getLoginFormUsername = createSelector(
  getLoginFormState,
  (state) => state?.username ?? ''
)
